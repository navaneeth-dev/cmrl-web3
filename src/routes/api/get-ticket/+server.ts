import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const POST = (async () => {
	const browser = await puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath(),
		headless: chromium.headless
	});

	const page = await browser.newPage();

	await page.goto('https://example.com');

	const title = await page.title();
	const content = await page.content();

	await browser.close();

	return new Response(title);
}) satisfies RequestHandler;
