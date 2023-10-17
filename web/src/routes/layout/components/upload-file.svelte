<script lang="ts">
	import { createRoom } from '../libs/query/create-room';

	const query = createRoom();
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
