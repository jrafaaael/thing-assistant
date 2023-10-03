import { PUBLIC_API_URL } from '$env/static/public';

interface Room {
	id: string;
	name: string;
	updatedAt: Date;
	isFromAi: boolean | null;
	lastMessageContent: string | null;
}

export async function load({ fetch, depends }) {
	const res = await fetch(`${PUBLIC_API_URL}/rooms`);
	const data: Room[] = await res.json();

	depends('layout:rooms');

	return { rooms: data };
}
