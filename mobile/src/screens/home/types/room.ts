export interface Room {
  id: string;
  name: string;
  updatedAt: Date;
  isFromAi: boolean | null;
  lastMessageContent: string | null;
}
