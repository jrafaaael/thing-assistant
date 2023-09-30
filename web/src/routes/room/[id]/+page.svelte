<script lang="ts">
	import type { PageData } from './$types';
	import MessageList from './components/message-list.svelte';
	import MessageComposer from './components/message-composer.svelte';

	export let data: PageData;

	$: id = data.id;
</script>

<header
	class="w-[calc(100%-28rem)] h-16 bg-neutral-800/50 border-b-2 border-white/10 flex justify-center items-center fixed right-0 -z-10 backdrop-blur-[2px]"
>
	<h2 class="text-2xl font-bold">ldfsdjflajlfjdl</h2>
</header>
<section class="h-screen flex flex-col justify-end [&>*]:px-6">
	<MessageList {id} />
	<MessageComposer />
</section>
