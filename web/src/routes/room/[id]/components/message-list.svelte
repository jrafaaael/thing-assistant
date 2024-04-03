<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { afterNavigate, invalidate } from '$app/navigation';
	import { useQueryClient } from '@tanstack/svelte-query';
	import IntersectionObserver from '$lib/components/intersection-observer.svelte';
	import Menu from '$lib/components/icons/menu.svelte';
	import { sidebar } from '$lib/stores/show-sidebar.store';
	import { getInfiniteMessageList } from '../libs/query/get-infinite-message-list';
	import { socket } from '../libs/socket-io';
	import MessageBubble from './message-bubble.svelte';

	export let title: string;
	let containerRef: HTMLDivElement;
	let queryClient = useQueryClient();

	$: id = $page.params.id;
	$: query = getInfiniteMessageList(id);
	$: messages = $query.data?.pages.flatMap((data) => data.messages) ?? [];
	$: lastMessageIsFromAi = messages.at(0)?.isFromAi ?? true;

	onMount(() => {
		async function received() {
			queryClient.invalidateQueries({
				queryKey: ['rooms', id, 'messages']
			});

			await invalidate('layout:rooms');
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
	class="w-full h-full flex flex-col relative overflow-y-scroll overflow-x-hidden [&]:[scrollbar-gutter:stable_both-edges]"
	bind:this={containerRef}
>
	<header
		class="w-full h-14 mb-4 bg-neutral-800/50 border-b-2 border-white/10 shrink-0 flex justify-center items-center sticky top-0 right-0 z-10 backdrop-blur-[2px] [@media(hover:hover)]:w-[104%] md:h-[70px]"
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
			<div class="flex flex-col justify-center items-center">
				<h2 class="text-2xl font-bold">{title}</h2>
				{#if !lastMessageIsFromAi}
					<span transition:slide class="text-sm"
						>The
						<span class="font-bold"> Assistant </span>
						is generating your response</span
					>
				{/if}
			</div>
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
				<MessageBubble
					content={message.content}
					createdAt={message.createdAt}
					isFromAi={message.isFromAi}
				/>
			{/each}
		{/if}
	</ul>
</div>
