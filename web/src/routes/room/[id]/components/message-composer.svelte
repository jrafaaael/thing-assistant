<script lang="ts">
	import { useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import Input from '$lib/components/input.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import { socket } from '../libs/socket-io';

	let message = '';
	let queryClient = useQueryClient();
	let inputRef: Input;
	$: id = $page.params.id;

	function handleSendMessage() {
		if (message.length <= 0) {
			return;
		}

		socket.emit('message.new', { content: message, roomId: id });

		inputRef.resetHeight();

		queryClient.invalidateQueries({
			queryKey: ['rooms', id, 'messages']
		});

		message = '';
	}
</script>

<div class="w-full max-w-3xl mx-auto px-6 pb-6 pt-3">
	<form class="w-full flex items-end gap-4" on:submit|preventDefault={handleSendMessage}>
		<Input
			name="message"
			id="message"
			classNames="max-h-52 p-3 bg-neutral-700 rounded-2xl"
			placeholder="Message"
			bind:this={inputRef}
			bind:value={message}
		/>
		<button class="p-3">
			<div class="h-6 aspect-square">
				<Send class="stroke-blue-500" />
			</div>
		</button>
	</form>
</div>
