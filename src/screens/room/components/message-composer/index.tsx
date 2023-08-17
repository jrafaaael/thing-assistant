import { useRef } from "react";
import { Pressable, View } from "react-native";

import { Input } from "@/components/input";
import { Send } from "@/components/icons/send";
import { socket } from "../../libs/socket-io";
import { styles } from "./styles";
import { COLORS } from "@/styles";

interface Props {
  id: string;
}

export function MessageComposer({ id }: Props) {
  const message = useRef("");

  const handleSendMessage = () => {
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
