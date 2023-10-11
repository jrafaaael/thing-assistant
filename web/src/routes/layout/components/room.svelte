<script lang="ts">
	import Link from '$lib/components/link.svelte';
	import { formatDate } from '$lib/utils/format-date';

	export let id: string;
	export let name: string;
	export let updatedAt: Date;
	export let isFromAi: boolean | null;
	export let lastMessageContent: string | null;
</script>

<li>
	<Link
		class="p-4 border-b-2 border-x-4 border-transparent border-b-white/10 flex flex-col gap-1 hover:bg-neutral-800 [&.active]:bg-neutral-800 [&.active]:border-l-orange-hard"
		href="/room/{id}"
	>
		<div class="flex justify-between items-end gap-12">
			<h6 class="line-clamp-1 break-all flex-1">
				{name}
			</h6>
			<time class="text-sm text-neutral-400" datetime={new Date(updatedAt).toLocaleString()}>
				{formatDate(new Date(updatedAt))}
			</time>
		</div>
		<p class="text-sm text-neutral-400 line-clamp-1">
			<span class="font-bold">{isFromAi ? 'Cohere' : 'You'}: </span>
			<span>{lastMessageContent}</span>
		</p>
	</Link>
</li>
