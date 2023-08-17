import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

interface CreateRoomParams {
  uri: string;
  name: string;
  type: string;
}

export async function createRoom({ uri, name, type }: CreateRoomParams) {
  const blob = {
    uri,
    name,
    type,
  } as unknown as Blob;

  const body = new FormData();
  body.append("file", blob);

  const res = await axios.post(`/room/ingest`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uri, name, type }: CreateRoomParams) =>
      createRoom({ uri, name, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });
}
