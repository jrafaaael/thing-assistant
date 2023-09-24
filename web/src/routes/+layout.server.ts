import { API_URL } from '$env/static/private';

interface Room {
	id: string;
	name: string;
	updatedAt: Date;
	isFromAi: boolean | null;
	lastMessageContent: string | null;
}

export async function load() {
	const res = await fetch(`${API_URL}/rooms`);
	const data: Room[] = await res.json();

	return { rooms: data };
}
