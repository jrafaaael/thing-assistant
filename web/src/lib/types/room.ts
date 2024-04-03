export interface Room {
	id: string;
	name: string;
	createdAt: Date;
}

export type RoomWithMessage = Omit<Room, 'createdAt'> & {
	updatedAt: Date;
	isFromAi: boolean | null;
	lastMessageContent: string | null;
};
