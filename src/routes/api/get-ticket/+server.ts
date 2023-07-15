import { decryptResponse, getEncrypt } from '$lib/server/utils';
import type { RequestHandler } from './$types';
import puppeteer, { ElementHandle } from 'puppeteer';
import { env } from '$env/dynamic/private';

export const POST = (async () => {
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

	// Select UPI, type cast here as open issue in GitHub
	const upiDiv = (await (
		await page.evaluateHandle(
			`document.querySelector("body > bd-modal").shadowRoot.querySelector("#pay-option-item_wrapper > div > bd-pay-option > div > div")`
		)
	).asElement()) as ElementHandle<Element>;
	await upiDiv?.click();

	const upiVpa = (await (
		await page.evaluateHandle(
			`document.querySelector("body > bd-modal").shadowRoot.querySelector("#upi_vpa")`
		)
	).asElement()) as ElementHandle<Element>;
	await upiVpa.type(env.UPI_VPA);

	await new Promise((r) => setTimeout(r, 2000));

	await browser.close();

	return new Response('Test');
}) satisfies RequestHandler;
