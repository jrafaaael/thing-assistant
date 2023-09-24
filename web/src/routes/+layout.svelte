<script lang="ts">
	import type { LayoutData } from './$types';
	import { formatDate } from '$lib/utils/format-date';
	import '../app.css';

	export let data: LayoutData;
</script>

<aside
	class="max-w-md p-4 border-r-2 border-neutral-700/70 fixed inset-0 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
>
	<ul class="flex flex-col gap-2">
		{#each data.rooms as room}
			<li>
				<a class="p-4 rounded-2xl flex flex-col gap-1 hover:bg-white/5" href="/room/{room.id}">
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
				</a>
			</li>
		{/each}
	</ul>
</aside>
<main class="ml-[28rem]">
	<slot />
</main>
