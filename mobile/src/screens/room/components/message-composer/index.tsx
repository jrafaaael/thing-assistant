import { useRef } from "react";
import { Pressable, View } from "react-native";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

import { Input } from "@/components/input";
import { Send } from "@/components/icons/send";
import { COLORS } from "@/styles";
import { socket } from "../../libs/socket-io";
import { InfiniteMessageListResponse } from "../../hooks/use-infinite-message-list";
import { styles } from "./styles";

interface Props {
  id: string;
}

export function MessageComposer({ id }: Props) {
  const message = useRef("");
  const queryClient = useQueryClient();

  const handleSendMessage = async () => {
    queryClient.invalidateQueries(["rooms"]);
    await queryClient.cancelQueries(["rooms", id, "messages"]);

    queryClient.setQueryData<InfiniteData<InfiniteMessageListResponse>>(
      ["rooms", id, "messages"],
      (prev) => ({
        ...prev!,
        pages: [
          {
            messages: [
              {
                id: new Date().getTime().toString(10),
                content: message.current,
                roomId: id,
                isFromAi: false,
                createdAt: new Date(),
              },
            ],
            metadata: {
              nextCursor: -1,
            },
          },
          ...prev?.pages!,
        ],
      })
    );

    socket.emit("message.new", { content: message.current, roomId: id });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <Input
          multiline
          placeholder="Message"
          style={styles.input}
          onChangeText={(text) => (message.current = text)}
        />
      </View>
      <Pressable style={styles.send} onPressIn={handleSendMessage}>
        <View style={styles.sendIconWrapper}>
          <Send stroke={COLORS.blue.ios} />
        </View>
      </Pressable>
    </View>
  );
}
