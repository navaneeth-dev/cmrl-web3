import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await fetch(`${env.PUBLIC_BITCART_URL}/api/invoices/${params.invoiceId}`);
	const invoice = await response.json();
	return { invoice };
}) satisfies PageLoad;
