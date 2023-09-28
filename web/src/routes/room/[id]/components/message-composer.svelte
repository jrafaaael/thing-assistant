<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import Send from '$lib/components/icons/send.svelte';

	let message = '';
</script>

<div class="w-full py-6">
	<form class="w-full max-w-3xl mx-auto flex items-end gap-4">
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
