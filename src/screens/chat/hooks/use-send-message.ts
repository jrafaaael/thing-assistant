import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface SendMessage {
  content: string;
  roomId: string;
}

async function sendMessage({ content, roomId }: SendMessage) {
  const res = await axios.post("/chat/ask", { content, roomId });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: SendMessage) => sendMessage(data),
  });
}
