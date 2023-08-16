import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Message } from "../message";
import { socket } from "../../libs/socket-io";

interface IMessage {
  id: string;
  content: string;
  created_at: Date;
  is_from_ai: boolean;
  roomId: string;
}

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
      renderItem={({ item: { content } }) => <Message content={content} />}
      keyExtractor={({ id }) => id}
    />
  );
}
