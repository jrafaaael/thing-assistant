import { tick } from 'svelte';
import { invalidate } from '$app/navigation';
import { createMutation } from '@tanstack/svelte-query';
import { ky } from '$lib/libs/ky';
import { uploadQueue } from '../../store/upload-queue.store';

interface UploadFileParams {
	file: File;
	tmpId: string;
}

interface UploadFileResponse {
	ok: boolean;
	tmpId: string;
}

async function uploadFile({ file, tmpId }: UploadFileParams): Promise<UploadFileResponse> {
	const body = new FormData();
	body.append('file', file);
	body.append('tmpId', tmpId);

	const res = (await ky.post('rooms/ingest', { body }).json()) as UploadFileResponse;

	return res;
}

export function createRoom() {
	return createMutation({
		mutationFn: (data: UploadFileParams) => uploadFile(data),
		onMutate: ({ file, tmpId }) => uploadQueue.enqueue({ name: file.name, tmpId }),
		onSuccess: async (data: UploadFileResponse) => {
			await invalidate('layout:rooms');
			await tick();
			uploadQueue.remove(data.tmpId);
		}
	});
}
