<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { useQueryClient } from '@tanstack/svelte-query';
	import Input from '$lib/components/input.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import { socket } from '../libs/socket-io';

	let message = '';
	let queryClient = useQueryClient();
	let inputRef: Input;
	$: id = $page.params.id;

	async function sendMessage() {
		const trimmedMessage = message.trim();

		message = '';

		inputRef.resetHeight();

		if (trimmedMessage.length <= 0) {
			return;
		}

		socket.emit('message.new', { content: trimmedMessage, roomId: id });

		queryClient.invalidateQueries({
			queryKey: ['rooms', id, 'messages']
		});
		await invalidate('layout:rooms');
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="w-full max-w-3xl mx-auto px-6 pb-6 pt-3">
	<form class="w-full flex items-end gap-4" on:submit|preventDefault={sendMessage}>
		<Input
			name="message"
			id="message"
			classNames="max-h-52 p-3 bg-neutral-700 rounded-2xl"
			placeholder="Message"
			bind:this={inputRef}
			bind:value={message}
			on:keydown={handleKeydown}
		/>
		<button class="p-3">
			<div class="h-6 aspect-square">
				<Send class="stroke-blue-500" />
			</div>
		</button>
	</form>
</div>
