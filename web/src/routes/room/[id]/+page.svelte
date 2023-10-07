<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import MessageList from './components/message-list.svelte';
	import MessageComposer from './components/message-composer.svelte';

	export let data: PageData;
</script>

<section class="h-screen flex flex-col justify-end">
	<MessageList title={data.room.name} />
	<div class={browser ? 'block' : 'hidden [@media(hover:hover)]:block'}>
		<MessageComposer />
	</div>
</section>
