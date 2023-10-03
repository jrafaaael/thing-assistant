<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import RoomList from './layout/components/room-list.svelte';
	import '../app.css';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<RoomList />
	<main class="ml-[28rem]">
		<slot />
	</main>
</QueryClientProvider>
