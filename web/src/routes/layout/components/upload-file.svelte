<script lang="ts">
	import { tick } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { createRoom } from '../libs/query/create-room';
	import { uploadQueue } from '../store/upload-queue.store';

	const query = createRoom({
		onMutate: ({ file, tmpId }) => {
			uploadQueue.enqueue({ name: file.name, tmpId });
		},
		onSuccess: async (data) => {
			await invalidate('layout:rooms');
			await tick();
			uploadQueue.remove(data.tmpId);
		}
	});
	let inputRef: HTMLInputElement;

	function handleSelectFile() {
		inputRef.click();
	}

	function handleUploadFile() {
		const files = inputRef.files;

		if ((files?.length ?? 0) <= 0) {
			return;
		}

		const file = files?.item(0)!;
		const tmpId = new Date().getTime().toString(10);

		$query.mutate({ file, tmpId });
	}
</script>

<header
	class="h-[70px] px-4 bg-neutral-900/50 border-b-2 border-x-4 border-transparent border-b-white/10 shrink-0 flex justify-between items-center gap-10 sticky top-0 backdrop-blur-[2px]"
>
	<h3 class="text-xl font-bold">Chats</h3>
	<button
		class="p-1 px-2 bg-orange-hard rounded-md text-sm transition active:scale-[0.97]"
		on:click={handleSelectFile}
	>
		New chat
	</button>
	<input
		type="file"
		name="file"
		id="file"
		accept=".pdf"
		class="sr-only"
		bind:this={inputRef}
		on:change={handleUploadFile}
	/>
</header>
