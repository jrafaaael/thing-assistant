<script lang="ts">
	export let isFromAi: boolean;
	export let content: string;
	export let createdAt: Date;
</script>

<li class="flex flex-col gap-1 {isFromAi ? 'items-start' : 'items-end'}">
	<span class="font-bold text-neutral-400">{isFromAi ? 'Cohere' : 'You'}</span>
	<div
		class="max-w-[90%] py-2 px-4 rounded-3xl md:max-w-[70%] {isFromAi
			? 'bg-blue-600 rounded-tl-[4px]'
			: 'bg-neutral-700 rounded-tr-[4px]'}"
	>
		<span>{content}</span>
		<time
			class="ml-3 mt-[6px] text-xs inline-block float-right {!isFromAi ? 'text-white/70' : ''}"
			datetime={new Date(createdAt).toLocaleString()}
			>{new Date(createdAt).toLocaleString(undefined, {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			})}</time
		>
	</div>
</li>
