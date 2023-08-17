import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Message } from "../message";
import { Message as IMessage } from "../../types/message";
import { socket } from "../../libs/socket-io";
import { SPACING } from "@/styles";

export function MessageList() {
  const [messsages, setMesssages] = useState<IMessage[]>([]);

  useEffect(() => {
    function received(message: IMessage) {
      setMesssages((oldMessage) => [...oldMessage, message]);
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
      data={messsages}
      renderItem={({ item }) => <Message {...item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: SPACING.base }} />}
    />
  );
}
