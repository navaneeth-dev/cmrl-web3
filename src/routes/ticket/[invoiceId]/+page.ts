import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params, depends }) => {
	depends('app:checkTicket');
	const response = await fetch(`${env.PUBLIC_BITCART_URL}/api/invoices/${params.invoiceId}`);
	const invoice = await response.json();
	return { invoice };
}) satisfies PageLoad;
