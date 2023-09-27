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
	<aside class="max-w-md p-4 border-r-2 border-white/5 fixed inset-0 overflow-y-scroll">
		<ul class="flex flex-col gap-2">
			{#each data.rooms as room}
				<li>
					<Link
						class="p-4 rounded-2xl flex flex-col gap-1 hover:bg-white/5 [&.active]:bg-white/10"
						href="/room/{room.id}"
					>
						<div class="flex justify-between items-end gap-12">
							<h6 class="line-clamp-1 break-all">
								{room.name}
							</h6>
							<time
								class="text-sm text-neutral-400"
								datetime={new Date(room.updatedAt).getTime().toString(10)}
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
