<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let files: File[] = [];
	export let isDrag = false;
	export let accept: string | null = null;

	const dispatcher = createEventDispatcher();

	function handleDrop(e: DragEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		isDrag = false;
		const dt = e.dataTransfer!;
		files = accept ? [...dt.files].filter(({ type }) => type === accept) : [...dt.files];

		if (files.length > 0) {
			dispatcher('change');
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:dragenter|preventDefault|stopPropagation={() => (isDrag = true)}
	on:dragover|preventDefault|stopPropagation={() => (isDrag = true)}
	on:dragleave|preventDefault|stopPropagation={() => (isDrag = false)}
	on:drop|preventDefault|stopPropagation={handleDrop}
	{...$$restProps}
>
	<slot />
</div>
