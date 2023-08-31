import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

import { Message } from "../message";
import { useInfiniteMessageList } from "../../hooks/use-infinite-message-list";
import { socket } from "../../libs/socket-io";
import { Message as IMessage } from "@/types/message";
import { SPACING } from "@/styles";
import { styles } from "./styles";

interface Props {
  id: string;
}

export function MessageList({ id }: Props) {
  const queryClient = useQueryClient();
  const { data, fetchNextPage } = useInfiniteMessageList(id);

  const messages = data?.pages.flatMap((data) => data.messages);

  useEffect(() => {
    async function received(_: IMessage) {
      queryClient.invalidateQueries({
        queryKey: ["rooms", id, "messages"],
      });
    }

    socket.on("message.generated", received);

    return () => {
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
