<script lang="ts">
	import { useQueryClient } from '@tanstack/svelte-query';
	import { page } from '$app/stores';
	import Input from '$lib/components/input.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import { socket } from '../libs/socket-io';

	let message = '';
	let queryClient = useQueryClient();
	$: id = $page.params.id;

	function handleSendMessage() {
		if (message.length <= 0) {
			return;
		}

		socket.emit('message.new', { content: message, roomId: id });

		queryClient.invalidateQueries({
			queryKey: ['rooms', id, 'messages']
		});

		message = '';
	}
</script>

<div class="w-full py-6">
	<form
		class="w-full max-w-3xl mx-auto flex items-end gap-4"
		on:submit|preventDefault={handleSendMessage}
	>
		<Input
			name="message"
			id="message"
			classNames="max-h-52 p-3 bg-neutral-700 rounded-2xl"
			placeholder="Message"
			bind:value={message}
		/>
		<button class="p-3">
			<div class="h-6 aspect-square">
				<Send class="stroke-blue-500" />
			</div>
		</button>
	</form>
</div>
