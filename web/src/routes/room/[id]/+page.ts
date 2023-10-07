import { PUBLIC_API_URL } from '$env/static/public';
import type { Room } from '$lib/types/room.js';

export async function load({ params, fetch }) {
	const id = params.id;
	const res = await fetch(`${PUBLIC_API_URL}/rooms/${id}`);
	const room: Room = await res.json();

	return { room };
}
