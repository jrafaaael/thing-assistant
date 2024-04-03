import { writable } from 'svelte/store';

interface FileToUpload {
	name: string;
	tmpId: string;
}

function createUploadQueue() {
	const { subscribe, update } = writable<FileToUpload[]>([]);

	return {
		subscribe,
		enqueue: (file: FileToUpload) => update((value) => [file, ...value]),
		remove: (id: string) => update((files) => files.filter((file) => file.tmpId !== id))
	};
}

export const uploadQueue = createUploadQueue();
