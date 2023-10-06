<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { showSidebar } from '$lib/stores/show-sidebar.store';
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
		showSidebar.open();
	});
</script>

<QueryClientProvider client={queryClient}>
	<div
		class="grid {isIndex ? 'grid-cols-[auto,1fr]' : 'grid-cols-[0,auto]'} md:grid-cols-[auto,1fr]"
	>
		{#if $showSidebar || isIndex}
			<aside
				class="w-full max-h-screen bg-neutral-900 relative overflow-y-scroll lg:max-w-sm xl:max-w-md {isIndex
					? 'sm:max-w-sm'
					: 'sm:max-w-xs'}"
				transition:slide={{ axis: 'x' }}
			>
				<UploadFile />
				<RoomList />
			</aside>
		{/if}
		<main>
			<slot />
		</main>
	</div>
</QueryClientProvider>
