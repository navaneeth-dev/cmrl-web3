import type { RequestHandler } from './$types';
import puppeteer, { ElementHandle } from 'puppeteer';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { NFTStorage } from 'nft.storage';

const client = new NFTStorage({ token: env.NFT_STORAGE_TOKEN });

export const POST = (async ({ request }) => {
	const data = await request.json();

	// Check invoice id via API
	const response = await fetch(publicEnv.PUBLIC_BITCART_URL + '/api/invoices/' + data.id);
	const invoice = await response.json();

	const updateInvoice = await fetch(
		publicEnv.PUBLIC_BITCART_URL + '/api/invoices/' + data.id + '/customer',
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ notes: 'sdfsdf' })
		}
	);
	const json = await updateInvoice.json();
	console.log(json);
	return new Response('Already generated');

	if (invoice.status !== 'complete')
		return new Response('WebHook cannot run, status is not complete');

	// If not blank return
	if (invoice.notes !== '') return new Response('Already generated');

	// Get ticket only if first time and status complete

	const initiatePaymentUrl = 'https://tickets.chennaimetrorail.org/';

	const browser = await puppeteer.launch({ headless: false });

	const page = await browser.newPage();

	await page.goto(initiatePaymentUrl);

	const sourceStationId = '0213';
	const destStationId = '0215';

	await page.select('#login > form > div:nth-child(1) > select', sourceStationId);
	await page.select('#login > form > div:nth-child(2) > select', destStationId);

	// Mobile No
	await page.type('#login > form > div:nth-child(3) > input', '1111111111');

	// Submit
	await page.click('#login > form > div:nth-child(6) > button');

	await page.waitForSelector('body > ngb-modal-window > div > div > div.modal-footer > button');
	await page.click('body > ngb-modal-window > div > div > div.modal-footer > button');

	await page.waitForSelector('body > bd-modal');

	// Select UPI, type cast here as open issue in GitHub
	await page.waitForFunction(
		'document.querySelector("body > bd-modal").shadowRoot.querySelector("#pay-option-item_wrapper > div > bd-pay-option > div > div")'
	);

	const upiDiv = (await (
		await page.evaluateHandle(
			'document.querySelector("body > bd-modal").shadowRoot.querySelector("bd-section:nth-child(3) #pay-option-item_wrapper > div > bd-pay-option > div > div")'
		)
	).asElement()) as ElementHandle<Element>;
	await upiDiv?.click();

	// Wait for UPI VPA input
	await page.waitForFunction(
		'document.querySelector("body > bd-modal").shadowRoot.querySelector("#upi_vpa")'
	);

	const upiVpa = (await (
		await page.evaluateHandle(
			`document.querySelector("body > bd-modal").shadowRoot.querySelector("#upi_vpa")`
		)
	).asElement()) as ElementHandle<Element>;
	await upiVpa.type(env.UPI_VPA);

	const payBtn = (await (
		await page.evaluateHandle(
			`document.querySelector("body > bd-modal").shadowRoot.querySelector("#undefined_wrapper > div > bd-button > div > center > button")`
		)
	).asElement()) as ElementHandle<Element>;
	payBtn.click();

	// Wait 5mins for payment
	// await new Promise((r) => setTimeout(r, 60 * 1000));
	await page.waitForNavigation();
	await page.waitForNetworkIdle();

	// Get ticket image
	const imgBase64: string = await page.evaluate(
		`document.querySelector("div > div.col-md-5.col-sm-5.col-5 > div:nth-child(1) > img").getAttribute('src')`
	);

	await browser.close();

	return new Response(imgBase64);
}) satisfies RequestHandler;
