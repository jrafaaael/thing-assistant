<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { useQueryClient } from '@tanstack/svelte-query';
	import IntersectionObserver from '$lib/components/intersection-observer.svelte';
	import { createInfiniteMessageList } from '../api/create-infinite-message-list';
	import { socket } from '../libs/socket-io';

	export let id: string;
	let containerRef: HTMLDivElement;
	let queryClient = useQueryClient();

	$: query = createInfiniteMessageList(id);
	$: messages = $query.data?.pages.flatMap((data) => data.messages) ?? [];

	onMount(() => {
		async function received() {
			queryClient.invalidateQueries({
				queryKey: ['rooms', id, 'messages']
			});

			queryClient.invalidateQueries({
				queryKey: ['rooms']
			});
		}

		socket.on('message.generated', received);

		return () => {
			socket.off('message.generated', received);
		};
	});
	afterUpdate(() => {
		// When user has fetched only one batch of messages, keep user at bottom of list
		const pages = $query.data?.pages.length ?? 0;

		if (pages <= 1) {
			containerRef.scrollTo({
				top: containerRef.scrollHeight
			});
		}
	});
	afterNavigate(() => {
		containerRef.scrollTo({
			top: containerRef.scrollHeight
		});
	});
</script>

<div class="w-full h-full overflow-y-scroll pt-20" bind:this={containerRef}>
	<IntersectionObserver
		top={'1000px'}
		root="parent"
		onIntersecting={() => $query.hasNextPage && $query.fetchNextPage()}
	/>
	<ul class="w-full max-w-3xl min-h-full mx-auto mt-auto flex flex-col-reverse gap-6">
		{#if $query.isSuccess}
			{#each messages as message}
				<li
					class="flex flex-col gap-1 relative -z-20 {message.isFromAi
						? 'items-start'
						: 'items-end'}"
				>
					<span class="font-bold text-neutral-400">{message.isFromAi ? 'Cohere' : 'You'}</span>
					<div
						class="max-w-[70%] py-2 px-4 rounded-3xl {message.isFromAi
							? 'bg-blue-600 rounded-tl-[4px]'
							: 'bg-neutral-700 rounded-tr-[4px]'}"
					>
						<span>{message.content}</span>
						<time
							class="ml-3 mt-[6px] text-xs inline-block float-right {!message.isFromAi
								? 'text-white/70'
								: ''}"
							datetime={new Date(message.createdAt).toLocaleString()}
							>{new Date(message.createdAt).toLocaleString(undefined, {
								hour: '2-digit',
								minute: '2-digit'
							})}</time
						>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
