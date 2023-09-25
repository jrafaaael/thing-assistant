<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { createInfiniteMessageList } from '../api/create-infinite-message-list';

	export let id: string;
	let bottomRef: HTMLSpanElement;

	$: query = createInfiniteMessageList(id);

	afterUpdate(() => {
		bottomRef.scrollIntoView();
	});
	afterNavigate(() => {
		bottomRef.scrollIntoView();
	});
</script>

<ul class="w-full flex flex-col-reverse justify-end gap-6">
	{#if $query.isSuccess}
		{#each $query.data.messages as message}
			<li class="flex flex-col gap-1 {message.isFromAi ? 'items-start' : 'items-end'}">
				<span class="font-bold text-neutral-400">{message.isFromAi ? 'Cohere' : 'You'}</span>
				<div
					class="max-w-[55%] py-2 px-4 rounded-3xl {message.isFromAi
						? 'bg-blue-600 rounded-tl-[4px]'
						: 'bg-neutral-700 rounded-tr-[4px]'}"
				>
					<p>{message.content}</p>
				</div>
			</li>
		{/each}
	{/if}
</ul>
<span bind:this={bottomRef} id="bottom" />
