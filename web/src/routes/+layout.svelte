<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import UploadFile from './layout/components/upload-file.svelte';
	import RoomList from './layout/components/room-list.svelte';
	import '../app.css';

	const queryClient = new QueryClient();
	$: isIndex = $page.route.id === '/';

	onMount(() => {
		const vh = window.innerHeight / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
</script>

<QueryClientProvider client={queryClient}>
	<div
		class="grid {isIndex ? 'grid-cols-[auto,1fr]' : 'grid-cols-[0,auto]'} md:grid-cols-[auto,1fr]"
	>
		<aside class="w-full max-h-screen bg-neutral-900 overflow-y-scroll sm:max-w-xs lg:max-w-md">
			<UploadFile />
			<RoomList />
		</aside>
		<main>
			<slot />
		</main>
	</div>
</QueryClientProvider>
