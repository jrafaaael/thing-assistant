<script lang="ts">
	import { browser } from '$app/environment';
	import MessageList from './components/message-list.svelte';
	import MessageComposer from './components/message-composer.svelte';
</script>

<section class="h-screen flex flex-col justify-end">
	<MessageList />
	<div class={browser ? 'block' : 'hidden [@media(hover:hover)]:block'}>
		<MessageComposer />
	</div>
</section>
