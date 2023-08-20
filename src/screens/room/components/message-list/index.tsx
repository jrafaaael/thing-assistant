import { useEffect } from "react";
import { FlatList, View } from "react-native";

import { Message } from "../message";
import { Message as IMessage } from "../../types/message";
import { socket } from "../../libs/socket-io";
import { SPACING } from "@/styles";
import { styles } from "./styles";
import { useGetMessageList } from "../../hooks/use-get-message-list";

interface Props {
  id: string;
}

export function MessageList({ id }: Props) {
  const { data } = useGetMessageList(id);

  useEffect(() => {
    function received(message: IMessage) {
      // setMesssages((oldMessage) => [...oldMessage, message]);
    }

    socket.on("message.received", received);
    socket.on("message.generated", received);

    return () => {
      socket.off("message.received", received);
      socket.off("message.generated", received);
    };
  }, []);

  return (
    <FlatList
      data={data?.messages}
      renderItem={({ item }) => <Message {...item} />}
      keyExtractor={({ id }) => id}
      inverted
      ItemSeparatorComponent={() => <View style={{ height: SPACING.base }} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}
