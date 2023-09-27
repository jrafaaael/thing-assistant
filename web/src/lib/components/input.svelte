<script lang="ts">
	export let value = '';
	export let classNames = '';

	let textAreaRef: HTMLTextAreaElement;

	function handleInput(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		e.currentTarget.style.height = 'auto';
		e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
	}
</script>

<textarea
	class="w-full h-full border-none outline-none resize-none overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] {classNames}"
	rows="1"
	bind:value
	bind:this={textAreaRef}
	on:input={handleInput}
	{...$$restProps}
/>
