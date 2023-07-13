import { getEncrypt } from '$lib/server/utils';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';

export const POST = (async () => {
	const a = getEncrypt({ hello: 'world' });
	console.log(a);
	// const browser = await puppeteer.launch({ headless: 'new' });

	// const page = await browser.newPage();

	// await page.goto('https://example.com');

	// const title = await page.title();
	// const content = await page.content();

	// await browser.close();

	return new Response('Test');
}) satisfies RequestHandler;
