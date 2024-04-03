<script lang="ts">
	export let isFromAi: boolean;
	export let content: string;
	export let createdAt: Date;
</script>

<li class="flex flex-col gap-1 relative {isFromAi ? 'items-start' : 'items-end'}">
	<span class="font-bold text-neutral-400">{isFromAi ? 'Cohere' : 'You'}</span>
	<div
		class="max-w-[95%] py-2 px-4 rounded-3xl md:max-w-[70%] {isFromAi
			? 'bg-blue-600 rounded-tl-2xl rounded-bl-none'
			: 'bg-neutral-700 rounded-tr-2xl rounded-br-none'}"
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
	<div
		class="absolute bottom-0 {isFromAi
			? '-left-[6px] -scale-y-100'
			: ' -right-[6px] -scale-y-100 -scale-x-100'}"
	>
		<svg
			viewBox="0 0 11 20"
			width="11"
			height="20"
			class={isFromAi ? 'fill-blue-600' : 'fill-neutral-700'}
		>
			<path
				id="message-tail"
				d="M1.00002881,1.03679295e-14 L7,0 L7,17 C6.8069969,14.1607017 6.12380234,11.2332513 4.95041634,8.21764872 C4.04604748,5.89342034 2.50413132,3.73337411 0.324667862,1.73751004 L0.324652538,1.73752677 C-0.0826597201,1.36452676 -0.110475289,0.731958677 0.262524727,0.324646419 C0.451952959,0.117792698 0.719544377,1.0985861e-14 1.00002881,1.04360964e-14 Z"
			/>
		</svg>
	</div>
</li>
