export class RoomWithMessageDto {
  id: string;
  name: string;
  updatedAt: Date;
  isFromAi: boolean;
  lastMessageContent: string | null;
}

export class UploadedFileDto {
  tmpId: string;
}
