import { Message } from "@/types/message";

export interface Room {
  id: string;
  name: string;
  createdAt: string;
  messages: [Message] | [];
}
