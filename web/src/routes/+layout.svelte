<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import Link from '$lib/components/link.svelte';
	import { formatDate } from '$lib/utils/format-date';
	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;
	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<aside class="max-w-md fixed inset-0 overflow-y-scroll">
		<ul class="flex flex-col">
			{#each data.rooms as room}
				<li>
					<Link
						class="p-4 py-6 bg-neutral-900 border-b-2 border-x-4 border-transparent border-b-white/10 flex flex-col gap-1 hover:bg-transparent [&.active]:bg-transparent [&.active]:bg-gradient-to-r [&.active]:from-orange-hard/10 [&.active]:via-orange-hard/5 [&.active]:border-l-orange-hard"
						href="/room/{room.id}"
					>
						<div class="flex justify-between items-end gap-12">
							<h6 class="line-clamp-1 break-all">
								{room.name}
							</h6>
							<time
								class="text-sm text-neutral-400"
								datetime={new Date(room.updatedAt).toLocaleString()}
							>
								{formatDate(new Date(room.updatedAt))}
							</time>
						</div>
						<p class="text-sm text-neutral-400 line-clamp-1">
							<span class="font-bold">{room.isFromAi ? 'Cohere' : 'You'}: </span>
							<span>{room.lastMessageContent}</span>
						</p>
					</Link>
				</li>
			{/each}
		</ul>
	</aside>
	<main class="ml-[28rem]">
		<slot />
	</main>
</QueryClientProvider>
