import { FlatList } from "react-native";

import { Chat } from "../chat";
import { useGetChatList } from "../../hooks/use-get-chat-list";

export function ChatList() {
  const { data } = useGetChatList();

  return (
    <FlatList
      data={data}
      renderItem={({ item: { name, id } }) => <Chat name={name} id={id} />}
      keyExtractor={({ id }) => id}
    />
  );
}
