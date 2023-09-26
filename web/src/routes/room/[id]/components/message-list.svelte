<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import IntersectionObserver from '$lib/components/intersection-observer.svelte';
	import { createInfiniteMessageList } from '../api/create-infinite-message-list';

	export let id: string;
	let bottomRef: HTMLSpanElement;

	$: query = createInfiniteMessageList(id);
	$: messages = $query.data?.pages.flatMap((data) => data.messages) ?? [];

	afterUpdate(() => {
		// When user has fetched only one batch of messages, keep user at bottom of list
		const pages = $query.data?.pages.length ?? 0;

		if (pages <= 1) {
			bottomRef.scrollIntoView();
		}
	});
	afterNavigate(() => {
		bottomRef.scrollIntoView();
	});
</script>

<IntersectionObserver
	top={'500%'}
	onIntersecting={() => $query.hasNextPage && $query.fetchNextPage()}
/>
<ul class="w-full flex flex-col-reverse justify-end gap-6">
	{#if $query.isSuccess}
		{#each messages as message}
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
