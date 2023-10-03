import { createMutation } from '@tanstack/svelte-query';
import { ky } from '$lib/libs/ky';

async function uploadFile(file: File) {
	const body = new FormData();
	body.append('file', file);

	const res = await ky.post('rooms/ingest', { body }).json();
	console.log(res);

	return res;
}

export function createRoom() {
	return createMutation({
		mutationFn: (file: File) => uploadFile(file)
	});
}
