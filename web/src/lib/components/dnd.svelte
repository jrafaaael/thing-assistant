<script lang="ts">
	export let files: File[] = [];
	export let isDrag = false;

	function handleDrop(e: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		isDrag = false;
		const dt = e.dataTransfer!;
		files = [...dt.files];

		console.log(files);
	}
</script>

<div
	on:dragenter|preventDefault|stopPropagation={() => (isDrag = true)}
	on:dragover|preventDefault|stopPropagation={() => (isDrag = true)}
	on:dragleave|preventDefault|stopPropagation={() => (isDrag = false)}
	on:drop|preventDefault|stopPropagation={handleDrop}
	{...$$restProps}
>
	<slot />
</div>
