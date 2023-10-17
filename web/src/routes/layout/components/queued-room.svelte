<script lang="ts">
	import { onDestroy } from 'svelte';

	export let name: string;

	let date = new Date();

	const interval = setInterval(() => {
		date = new Date();
	}, 1000);

	onDestroy(() => clearInterval(interval));
</script>

<li
	class="p-3 px-4 border-x-[3px] border-y-2 border-transparent border-b-white/10 flex flex-col gap-1 hover:bg-neutral-800 [&.active]:bg-neutral-800 [&.active]:border-l-orange-hard"
>
	<div class="flex justify-between items-end gap-12">
		<div class="flex items-center gap-3 flex-1">
			<h6 class="line-clamp-1 break-all">
				{name}
			</h6>
			<div class="h-2 aspect-square bg-blue-500 rounded-full" />
		</div>
		<time class="text-sm text-neutral-400" datetime={date.toLocaleString()}>
			{date.toLocaleString(undefined, {
				hour: '2-digit',
				minute: '2-digit'
			})}
		</time>
	</div>
	<p class="text-sm text-neutral-400 line-clamp-1">Your document is uploading</p>
</li>
