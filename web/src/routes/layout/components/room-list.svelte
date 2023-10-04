<script lang="ts">
	import { page } from '$app/stores';
	import Link from '$lib/components/link.svelte';
	import { formatDate } from '$lib/utils/format-date';

	$: rooms = $page.data.rooms;
</script>

<ul class="flex flex-col">
	{#each rooms as room}
		<li>
			<Link
				class="p-4 border-b-2 border-x-4 border-transparent border-b-white/10 flex flex-col gap-1 hover:bg-neutral-800 [&.active]:bg-neutral-800 [&.active]:border-l-orange-hard"
				href="/room/{room.id}"
			>
				<div class="flex justify-between items-end gap-12">
					<h6 class="line-clamp-1 break-all flex-1">
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
