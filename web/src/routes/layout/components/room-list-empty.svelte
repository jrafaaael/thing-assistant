<script lang="ts">
	import { tick } from 'svelte';
	import { invalidate } from '$app/navigation';
	import Dnd from '$lib/components/dnd.svelte';
	import { createRoom } from '../libs/query/create-room';
	import { uploadQueue } from '../store/upload-queue.store';

	let files: File[] = [];
	let isDrag: boolean;

	const query = createRoom({
		onMutate: ({ file, tmpId }) => {
			uploadQueue.enqueue({ name: file.name, tmpId });
		},
		onSuccess: async (data) => {
			await invalidate('layout:rooms');
			await tick();
			uploadQueue.remove(data.tmpId);
		}
	});
	const styles = [
		{ scale: 0.84, translateY: '30px', delay: '200ms' },
		{ scale: 0.92, translateY: '15px', delay: '100ms' },
		{ scale: 1, translateY: '0px', delay: '0ms' }
	];

	function handleFileDrop() {
		if ((files?.length ?? 0) <= 0) {
			return;
		}

		const file = files?.at(0)!;
		const tmpId = new Date().getTime().toString(10);

		$query.mutate({ file, tmpId });
	}
</script>

<Dnd
	bind:isDrag
	bind:files
	accept="application/pdf"
	class="h-full m-6 my-10 p-6 border-[3px] border-dashed border-white/10 rounded-2xl"
	on:change={handleFileDrop}
>
	<div class="h-full flex flex-col justify-center items-center gap-4">
		<div class="w-full mb-4 flex flex-col gap-4 relative">
			{#each styles as { scale, translateY, delay }, i}
				<div
					class="w-full h-16 px-4 bg-gradient-to-b from-neutral-800 via-neutral-800 to-white/5 border-t border-x border-white/5 rounded-xl flex flex-col justify-evenly overflow-hidden transition duration-100
					{i === 0 ? '' : 'absolute'}"
					style="transform: scale({isDrag
						? scale * 1.05
						: scale}) translateY(-{translateY}); transition-delay: {delay};"
				>
					<div class="flex gap-12">
						<div class="w-full h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
						<div class="w-1/4 h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
					</div>
					<div class="w-full h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
				</div>
			{/each}
		</div>
		<h2 class="text-2xl text-center font-mono font-bold">You don't have any message yet!</h2>
		<p class="text-sm text-center">
			Drag'n drop a file here or click in <span class="font-bold">"New chat"</span> button to upload
			a PDF file and start chating with it!
		</p>
	</div>
</Dnd>
