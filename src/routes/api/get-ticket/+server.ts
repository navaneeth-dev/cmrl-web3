import type { RequestHandler } from './$types';
import puppeteer, { ElementHandle } from 'puppeteer';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export const POST = (async ({ request }) => {
	const data = await request.json();
	console.log(data);

	// Check invoice id via API
	const response = await fetch(publicEnv.PUBLIC_BITCART_URL + '/api/invoices/' + data.id);
	const invoice = await response.json();
	console.log(invoice);

	if (invoice.status !== 'complete')
		return new Response('WebHook cannot run, status is not complete');

	return new Response('Test');

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
	await new Promise((r) => setTimeout(r, 5 * 60 * 1000));

	await browser.close();
}) satisfies RequestHandler;
