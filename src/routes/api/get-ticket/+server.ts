import { getEncrypt } from '$lib/server/utils';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';

export const POST = (async () => {
	const a = getEncrypt({
		sourceStationId: '0231',
		destinationStationId: '0133',
		mediaTypeId: 'C3',
		vendorId: '01',
		passengerTypeId: '01'
	});
	console.log(a);
	// const browser = await puppeteer.launch({ headless: 'new' });

	// const page = await browser.newPage();

	// await page.goto('https://example.com');

	// const title = await page.title();
	// const content = await page.content();

	// await browser.close();

	return new Response(a);
}) satisfies RequestHandler;
