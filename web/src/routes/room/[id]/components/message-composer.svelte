<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import Send from '$lib/components/icons/send.svelte';

	let message = '';
</script>

<form class="py-6 flex items-end gap-4">
	<Input
		name="message"
		id="message"
		classNames="max-h-52 p-3 bg-neutral-700 rounded-2xl"
		placeholder="Message"
		bind:value={message}
	/>
	<button class="h-full aspect-square flex justify-center items-center">
		<div class="w-1/2 aspect-square">
			<Send class="stroke-blue-500" />
		</div>
	</button>
</form>
