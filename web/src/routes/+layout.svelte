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
		const vh = window.innerHeight / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	onNavigate(() => {
		sidebar.close();
	});
</script>

<svelte:window on:resize={handleResize} />

<QueryClientProvider client={queryClient}>
	<div class="grid {isIndex ? 'grid-cols-[auto,0]' : 'grid-cols-[0,auto]'} sm:grid-cols-[auto,1fr]">
		<aside
			class="w-full max-h-screen bg-neutral-900 relative overflow-y-scroll sm:min-w-[min(60vw,28rem)] sm:max-w-md sm:transition lg:min-w-0 lg:transition-none lg:translate-x-0 {$sidebar ||
			isIndex
				? 'sm:translate-x-0'
				: 'sm:-translate-x-1/2'}"
		>
			<UploadFile />
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
