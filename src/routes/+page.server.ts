import type { Actions } from './$types';
import { env } from '$env/dynamic/public';

export const actions = {
	default: async (event) => {
		const invoiceCreation = {
			price: 5,
			store_id: env.PUBLIC_BITCART_STORE_ID
			// notification_url: 'https://webhook.after.checkout.com/goeshere',
			// redirect_url: 'https://go.here.after.checkout.com'
		};

		const response = await fetch(env.PUBLIC_BITCART_URL + '/api/invoices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'q6ed4m_cNn6Ni0W3x3TTldDM5dTWtxz2uO7rTcME4q4'
			},
			body: JSON.stringify(invoiceCreation)
		});

		const data = await response.json();
		const id = data.id;

		return { id };
	}
} satisfies Actions;
