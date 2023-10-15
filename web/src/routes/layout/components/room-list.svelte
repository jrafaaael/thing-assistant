<script lang="ts">
	import type { RoomWithMessage } from '$lib/types/room';
	import { uploadQueue } from '../store/upload-queue.store';
	import QueuedRoom from './queued-room.svelte';
	import Room from './room.svelte';
	import RoomListEmpty from './room-list-empty.svelte';

	export let rooms: RoomWithMessage[];
</script>

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
	<RoomListEmpty />
{/if}
