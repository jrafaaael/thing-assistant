<script lang="ts">
	const styles = [
		{ scale: 0.84, translateY: '30px' },
		{ scale: 0.92, translateY: '15px' },
		{ scale: 1, translateY: '0px' }
	];
</script>

<div class="h-full px-4 flex flex-col justify-center items-center gap-4">
	<div class="w-full flex flex-col gap-4 relative -translate-y-20">
		{#each styles as { scale, translateY }}
			<div
				class="w-full h-16 px-4 bg-gradient-to-b from-neutral-800 via-neutral-800 to-white/5 border-t-2 border-t-white/5 rounded-xl flex flex-col justify-evenly overflow-hidden absolute"
				style="transform: scale({scale}) translateY(-{translateY});"
			>
				<div class="flex gap-12">
					<div class="w-full h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
					<div class="w-1/4 h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
				</div>
				<div class="w-full h-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full" />
			</div>
		{/each}
	</div>
	<h2 class="text-2xl text-center font-mono font-bold">You don't have any message yet!</h2>
	<p class="text-sm text-center">
		Drag'n drop a file here or click in <span class="font-bold">"New chat"</span> button to upload a
		PDF file and start chating with it!
	</p>
</div>
