import { PUBLIC_API_URL } from '$env/static/public';
import type { RoomWithMessage } from '$lib/types/room.js';

export async function load({ fetch, depends }) {
	const res = await fetch(`${PUBLIC_API_URL}/rooms`);
	const data: RoomWithMessage[] = await res.json();

	depends('layout:rooms');

	return { rooms: data };
}
