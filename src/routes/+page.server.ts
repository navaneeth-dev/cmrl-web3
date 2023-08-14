import type { Actions } from './$types';
import { env } from '$env/dynamic/public';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const sourceStationId = form.get('source_station_id');
		const destStationId = form.get('dest_station_id');

		const invoiceCreation = {
			price: 1,
			store_id: env.PUBLIC_BITCART_STORE_ID,
			notification_url: env.PUBLIC_API_URL + '/api/checkTicket',
			notes: `${sourceStationId}|${destStationId}`
		};

		const response = await fetch(env.PUBLIC_BITCART_URL + '/api/invoices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invoiceCreation)
		});

		const data = await response.json();
		const id = data.id;

		return { id };
	}
} satisfies Actions;
