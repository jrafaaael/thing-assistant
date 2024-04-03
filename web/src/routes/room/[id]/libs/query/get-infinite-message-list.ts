import { createInfiniteQuery } from '@tanstack/svelte-query';
import { ky } from '$lib/libs/ky';

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
	return (await ky
		.get(`rooms/${roomId}/messages?cursor=${cursor}`)
		.json()) as InfiniteMessageListResponse;
}

export function getInfiniteMessageList(roomId: string) {
	return createInfiniteQuery({
		queryKey: ['rooms', roomId, 'messages'],
		queryFn: ({ pageParam }) => getMessages({ roomId, cursor: pageParam }),
		getNextPageParam: (last) => last.metadata.nextCursor ?? undefined
	});
}
