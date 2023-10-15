<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { sidebar } from '$lib/stores/show-sidebar.store';
	import UploadFile from './layout/components/upload-file.svelte';
	import RoomList from './layout/components/room-list.svelte';
	import '../app.css';

	const queryClient = new QueryClient();
	$: isIndex = $page.route.id === '/';

	function handleResize() {
		const vh = window.innerHeight / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	onMount(() => {
		handleResize();
	});
	onNavigate(() => {
		sidebar.close();
	});
</script>

<svelte:window on:resize={handleResize} />

<QueryClientProvider client={queryClient}>
	<div class="grid {isIndex ? 'grid-cols-[auto,0]' : 'grid-cols-[0,auto]'} sm:grid-cols-[auto,1fr]">
		<aside
			class="w-full min-h-screen max-h-screen bg-neutral-900 flex flex-col relative overflow-y-scroll sm:min-w-[min(60vw,28rem)] sm:max-w-md sm:transition lg:min-w-[28rem] lg:transition-none lg:translate-x-0 {$sidebar ||
			isIndex
				? 'sm:translate-x-0'
				: 'sm:-translate-x-1/2'}"
		>
			<header
				class="h-[70px] px-4 bg-neutral-900/50 border-b-2 border-x-4 border-transparent border-b-white/10 shrink-0 flex justify-between items-center gap-10 sticky top-0 backdrop-blur-[2px]"
			>
				<h3 class="text-xl font-bold">Chats</h3>
				<UploadFile />
			</header>
			<RoomList />
		</aside>
		<main
			class="bg-neutral-800 w-full sm:transition lg:w-full lg:transition-none lg:translate-x-0 {!isIndex
				? 'sm:w-screen'
				: ''} {$sidebar || isIndex ? 'sm:translate-x-0' : 'sm:-translate-x-[min(60vw,28rem)]'}"
		>
			<slot />
		</main>
	</div>
</QueryClientProvider>
