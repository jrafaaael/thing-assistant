<script lang="ts">
	import { onMount } from 'svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import UploadFile from './layout/components/upload-file.svelte';
	import RoomList from './layout/components/room-list.svelte';
	import '../app.css';

	const queryClient = new QueryClient();

	onMount(() => {
		const vh = window.innerHeight / 100;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
</script>

<QueryClientProvider client={queryClient}>
	<aside class="max-w-md bg-neutral-900 fixed inset-0 overflow-y-scroll">
		<UploadFile />
		<RoomList />
	</aside>
	<main class="ml-[28rem]">
		<slot />
	</main>
</QueryClientProvider>
