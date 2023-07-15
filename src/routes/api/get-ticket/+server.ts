import { decryptResponse, getEncrypt } from '$lib/server/utils';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';

export const POST = (async () => {
	// const a = getEncrypt({
	// 	sourceStationId: '0231',
	// 	destinationStationId: '0133',
	// 	mediaTypeId: 'C3',
	// 	vendorId: '01',
	// 	passengerTypeId: '01'
	// });
	const a = decryptResponse(
		'dFZMVnojZ3dURjVKbmNmbHVUOHJuTWcxQG1uSjcwU3l1ZDIyU29pcnp5Ukc2Y0RyTUJSelhvbzc2azZyNUJwamI1MlI1NDRENm13RmY3MHMyTFVtOGVzc3B5OG0rRU9JcklKaTBwZVg0L0xxYk40alpxREZwR1NqUE40b0JKeDcwcCtHM0E1K290YitIZDRITzRGR2xGK3Q3ckMrbjdSMElwaERycU5SMEZzUEVWLzhqdHdKbitRd2R5TU5wUmRPdGthczFpZGI2Uzh2NFlTdUdsTEF2Rlp4akgvY3k0NXk2YTdBQU5RRlUyWm5ZRk1pdGVyVlp0S0JVbzVzbk01UmpPUlNsTTIrcGFrRT0='
	);
	console.log(a.message);
	// const browser = await puppeteer.launch({ headless: 'new' });

	// const page = await browser.newPage();

	// await page.goto('https://example.com');

	// const title = await page.title();
	// const content = await page.content();

	// await browser.close();

	return new Response(a);
}) satisfies RequestHandler;
