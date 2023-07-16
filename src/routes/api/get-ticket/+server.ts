import type { RequestHandler } from './$types';
import puppeteer, { ElementHandle } from 'puppeteer';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { NFTStorage } from 'nft.storage';

const nftStorage = new NFTStorage({ token: env.NFT_STORAGE_TOKEN });

export const POST = (async ({ request }) => {
	const data = await request.json();

	// Verify invoice id via API
	const response = await fetch(publicEnv.PUBLIC_BITCART_URL + '/api/invoices/' + data.id);
	const invoice = await response.json();
	console.log('Called');

	if (invoice.status !== 'complete')
		return new Response('WebHook cannot run, status is not complete');

	// If not blank return
	if (invoice.notes !== '') return new Response('Already generated');

	// Get ticket only if first time and status complete

	const initiatePaymentUrl = 'https://tickets.chennaimetrorail.org/';

	const browser = await puppeteer.launch({
		headless: 'new',
		executablePath: env.FLY_REGION ? '/usr/bin/google-chrome' : undefined,
		devtools: true,
		args: ['--no-sandbox']
	});

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

	// Ok modal
	await page.waitForSelector('body > ngb-modal-window > div > div > div.modal-footer > button');
	await page.click('body > ngb-modal-window > div > div > div.modal-footer > button');
	console.log('done');

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

	console.log('Waiting for payment');
	// Wait 5mins for payment
	// await new Promise((r) => setTimeout(r, 60 * 1000));
	await page.waitForNavigation();
	await page.waitForNetworkIdle();

	// Get ticket image
	const imgBase64 = (await page.evaluate(
		`document.querySelector("div > div.col-md-5.col-sm-5.col-5 > div:nth-child(1) > img").getAttribute('src')`
	)) as string;

	await browser.close();

	// Convert b64 str to Blob for uploading img
	const byteCharacters = atob(imgBase64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);

	// Upload img
	console.log('Uploading img');
	const blob = new Blob([byteArray], { type: 'image/png' });
	const cid = await nftStorage.storeBlob(blob);
	console.debug('CID', cid);

	// Update CID in Notes
	const updateInvoice = await fetch(
		publicEnv.PUBLIC_BITCART_URL + '/api/invoices/' + data.id + '/customer',
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ notes: cid })
		}
	);
	const json = await updateInvoice.json();
	console.log('Updated CID', json.id);

	return new Response(imgBase64);
}) satisfies RequestHandler;
