<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;

	$: active = $page.url.pathname === href;
</script>

<a {href} class:active {...$$restProps}>
	<slot />
</a>
