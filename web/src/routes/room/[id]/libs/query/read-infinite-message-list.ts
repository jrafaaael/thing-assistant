import { PUBLIC_API_URL } from '$env/static/public';
import { createInfiniteQuery } from '@tanstack/svelte-query';

export interface Message {
	id: string;
	content: string;
	createdAt: Date;
	isFromAi: boolean;
	roomId: string;
}

interface GetMessageListParams {
	roomId: string;
	cursor?: number;
}

export interface InfiniteMessageListResponse {
	messages: Message[];
	metadata: {
		nextCursor: number | null;
	};
}

async function getMessages({
	roomId,
	cursor = -1
}: GetMessageListParams): Promise<InfiniteMessageListResponse> {
	const res = await fetch(`${PUBLIC_API_URL}/rooms/${roomId}/messages?cursor=${cursor}`);
	const data = await res.json();

	return data;
}

export function getInfiniteMessageList(roomId: string) {
	return createInfiniteQuery({
		queryKey: ['rooms', roomId, 'messages'],
		queryFn: ({ pageParam }) => getMessages({ roomId, cursor: pageParam }),
		getNextPageParam: (last) => last.metadata.nextCursor ?? undefined
	});
}
