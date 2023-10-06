import { writable } from 'svelte/store';

export function showSidebarStore() {
	const { subscribe, update, set } = writable(true);

	return {
		subscribe,
		open: () => set(true),
		toggle: () => update((value) => !value)
	};
}

export const showSidebar = showSidebarStore();
