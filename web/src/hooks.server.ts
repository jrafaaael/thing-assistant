export function handleFetch({ request, fetch }) {
	if (request.url.includes('localhost')) {
		// clone the original request, but change the URL
		request = new Request(request.url.replace('localhost', 'thing-assistant-backend'), request);
	}

	return fetch(request);
}
