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

	onMount(() => {
		const vh = window.innerHeight / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	onNavigate(() => {
		sidebar.open();
	});
</script>

<QueryClientProvider client={queryClient}>
	<div
		class="grid {isIndex
			? 'grid-cols-[auto,1fr]'
			: 'grid-cols-[0,auto] sm:grid-cols-[auto,auto]'} lg:grid lg:grid-cols-[auto,1fr]"
	>
		<aside
			class="w-full max-h-screen bg-neutral-900 relative overflow-y-scroll sm:min-w-[50vw] sm:transition lg:min-w-0 lg:max-w-sm lg:transition-none lg:translate-x-0 xl:max-w-md {$sidebar
				? 'sm:translate-x-0'
				: 'sm:-translate-x-1/2'}"
		>
			<UploadFile />
			<RoomList />
		</aside>
		<main
			class="bg-neutral-800 sm:w-screen sm:transition lg:w-full lg:transition-none lg:translate-x-0 {$sidebar
				? 'sm:translate-x-0'
				: 'sm:-translate-x-1/2'}"
		>
			<slot />
		</main>
	</div>
</QueryClientProvider>
