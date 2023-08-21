import { useEffect } from "react";
import { FlatList, View } from "react-native";

import { Message } from "../message";
import { useInfiniteMessageList } from "../../hooks/use-infinite-message-list";
import { socket } from "../../libs/socket-io";
import { Message as IMessage } from "../../types/message";
import { SPACING } from "@/styles";
import { styles } from "./styles";

interface Props {
  id: string;
}

export function MessageList({ id }: Props) {
  const { data, fetchNextPage } = useInfiniteMessageList(id);
  const messages = data?.pages.flatMap((data) => data.messages);

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
      data={messages}
      renderItem={({ item }) => <Message {...item} />}
      keyExtractor={({ id }) => id}
      inverted
      ItemSeparatorComponent={() => <View style={{ height: SPACING.base }} />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={5}
      onEndReached={() => fetchNextPage()}
    />
  );
}
