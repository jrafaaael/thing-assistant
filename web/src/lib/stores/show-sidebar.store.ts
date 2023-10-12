import { writable } from 'svelte/store';

export function showSidebar() {
	const { subscribe, update, set } = writable(false);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false),
		toggle: () => update((value) => !value)
	};
}

export const sidebar = showSidebar();
