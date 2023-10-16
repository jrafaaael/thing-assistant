<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import Dnd from '$lib/components/dnd.svelte';
	import { uploadQueue } from '../store/upload-queue.store';
	import type { LayoutData } from '../../$types';
	import QueuedRoom from './queued-room.svelte';
	import Room from './room.svelte';
	import RoomListEmpty from './room-list-empty.svelte';
	import { createRoom } from '../libs/query/create-room';

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

	$: data = $page.data as LayoutData;

	function handleFileDrop() {
		if ((files?.length ?? 0) <= 0) {
			return;
		}

		const file = files?.at(0)!;
		const tmpId = new Date().getTime().toString(10);

		$query.mutate({ file, tmpId });
	}
</script>

<Dnd class="h-full" accept="application/pdf" bind:files bind:isDrag on:change={handleFileDrop}>
	{#if data.rooms.length > 0 || $uploadQueue.length > 0}
		<ul class="flex flex-col">
			{#each $uploadQueue as queuedRoom}
				<QueuedRoom name={queuedRoom.name} />
			{/each}
			{#each data.rooms as room (room.id)}
				<Room {...room} />
			{/each}
		</ul>
	{:else}
		<RoomListEmpty {isDrag} />
	{/if}
</Dnd>
