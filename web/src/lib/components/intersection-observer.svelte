<script lang="ts">
	import { onMount } from 'svelte';

	export let top = '0px';
	export let right = '0px';
	export let bottom = '0px';
	export let left = '0px';
	export let onIntersecting: () => void;

	let containerRef: HTMLDivElement;
	let rootMargin = `${top} ${right} ${bottom} ${left}`;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						onIntersecting();
					}
				});
			},
			{ rootMargin }
		);

		observer.observe(containerRef);

		return () => observer.unobserve(containerRef);
	});
</script>

<div bind:this={containerRef}>
	<slot />
</div>
