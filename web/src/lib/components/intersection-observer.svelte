<script lang="ts">
	import { onMount } from 'svelte';

	export let onIntersecting: () => void;
	let containerRef: HTMLDivElement;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
          onIntersecting()
				}
			});
		});

		observer.observe(containerRef);

		return () => observer.unobserve(containerRef);
	});
</script>

<div bind:this={containerRef}>
	<slot />
</div>
