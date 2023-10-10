import { createMutation } from '@tanstack/svelte-query';
import { ky } from '$lib/libs/ky';

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

export function createRoom({
	onMutate,
	onSuccess
}: {
	onMutate: (variables: UploadFileParams) => void;
	onSuccess: (data: UploadFileResponse) => void;
}) {
	return createMutation({
		mutationFn: (data: UploadFileParams) => uploadFile(data),
		onMutate: (variables) => onMutate(variables),
		onSuccess: (data: UploadFileResponse) => onSuccess(data)
	});
}
