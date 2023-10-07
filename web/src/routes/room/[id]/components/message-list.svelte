<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { useQueryClient } from '@tanstack/svelte-query';
	import IntersectionObserver from '$lib/components/intersection-observer.svelte';
	import Menu from '$lib/components/icons/menu.svelte';
	import { sidebar } from '$lib/stores/show-sidebar.store';
	import { getInfiniteMessageList } from '../libs/query/read-infinite-message-list';
	import { socket } from '../libs/socket-io';

	let containerRef: HTMLDivElement;
	let queryClient = useQueryClient();

	$: id = $page.params.id;
	$: query = getInfiniteMessageList(id);
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

<div
	class="w-full h-full relative overflow-y-scroll overflow-x-hidden [&]:[scrollbar-gutter:stable_both-edges]"
	bind:this={containerRef}
>
	<header
		class="w-full h-14 mb-4 bg-neutral-800/50 border-b-2 border-white/10 flex justify-center items-center sticky top-0 right-0 backdrop-blur-[2px] [@media(hover:hover)]:w-[104%] md:h-[70px]"
	>
		<div class="w-full flex justify-center items-center relative">
			<button
				class="p-3 absolute top-1/2 left-3 hidden -translate-y-1/2 sm:block lg:hidden"
				on:click={() => sidebar.toggle()}
			>
				<div class="h-6 aspect-square">
					<Menu />
				</div>
			</button>
			<h2 class="text-2xl font-bold">ldfsdjflajlfjdl</h2>
		</div>
	</header>
	<IntersectionObserver
		top={'1000px'}
		root="parent"
		onIntersecting={() => $query.hasNextPage && $query.fetchNextPage()}
	/>
	<ul class="w-full max-w-3xl mx-auto mt-auto px-6 flex flex-col-reverse gap-6">
		{#if $query.isSuccess}
			{#each messages as message}
				<li class="flex flex-col gap-1 {message.isFromAi ? 'items-start' : 'items-end'}">
					<span class="font-bold text-neutral-400">{message.isFromAi ? 'Cohere' : 'You'}</span>
					<div
						class="max-w-[90%] py-2 px-4 rounded-3xl md:max-w-[70%] {message.isFromAi
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
								minute: '2-digit',
								hour12: true
							})}</time
						>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
