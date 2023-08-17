export interface Message {
  id: string;
  content: string;
  created_at: Date;
  is_from_ai: boolean;
  roomId: string;
}
