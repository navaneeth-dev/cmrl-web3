import type { RequestHandler } from './$types';

export const POST = (() => {
	return new Response('hello world');
}) satisfies RequestHandler;
