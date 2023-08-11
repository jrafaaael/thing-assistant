import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface CreateChatParams {
  uri: string;
  name: string;
  type: string;
}

export async function createChat({ uri, name, type }: CreateChatParams) {
  const blob = {
    uri,
    name,
    type,
  } as unknown as Blob;

  const body = new FormData();
  body.append("file", blob);

  const res = await axios.post(`/chat/ingest`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uri, name, type }: CreateChatParams) =>
      createChat({ uri, name, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });
}
