<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { createRoom } from '../libs/query/create-room';

	let inputRef: HTMLInputElement;
	let query = createRoom();

	function handleSelectFile() {
		inputRef.click();
	}

	function handleUploadFile() {
		const files = inputRef.files;

		if ((files?.length ?? 0) <= 0) {
			return;
		}

		const first = files?.item(0)!;
		$query.mutate(first, {
			onSuccess() {
				invalidate('layout:rooms');
			}
		});
	}
</script>

<header
	class="h-[70px] px-4 bg-neutral-900/50 border-b-2 border-x-4 border-transparent border-b-white/10 flex justify-between items-center gap-10 sticky top-0 backdrop-blur-[2px]"
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
