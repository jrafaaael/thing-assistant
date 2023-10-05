<script lang="ts">
	import { browser } from '$app/environment';
	import MessageList from './components/message-list.svelte';
	import MessageComposer from './components/message-composer.svelte';
</script>

<header
	class="w-full h-14 bg-neutral-800/50 border-b-2 border-white/10 flex justify-center items-center fixed right-0 backdrop-blur-[2px] md:w-[calc(100%-20rem)] md:h-[70px] lg:w-[calc(100%-28rem)]"
>
	<h2 class="text-2xl font-bold">ldfsdjflajlfjdl</h2>
</header>
<section class="h-screen flex flex-col justify-end [&>*]:px-6">
	<MessageList />
	<div class={browser ? 'block' : 'hidden [@media(hover:hover)]:block'}>
		<MessageComposer />
	</div>
</section>
