<script lang="ts">
	import type { RoomWithMessage } from '$lib/types/room';
	import { uploadQueue } from '../store/upload-queue.store';
	import QueuedRoom from './queued-room.svelte';
	import Room from './room.svelte';

	export let rooms: RoomWithMessage[];
</script>

<ul class="flex flex-col">
	{#each $uploadQueue as queuedRoom}
		<QueuedRoom name={queuedRoom.name} />
	{/each}
	{#each rooms as room (room.id)}
		<Room {...room} />
	{/each}
</ul>
