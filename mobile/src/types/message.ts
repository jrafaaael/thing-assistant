export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  isFromAi: boolean;
  roomId: string;
}
