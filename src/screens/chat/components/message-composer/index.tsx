import { useRef } from "react";
import { Pressable, View } from "react-native";

import { useSendMessage } from "../../hooks/use-send-message";
import { Input } from "@/components/input";
import { Send } from "@/components/icons/send";
import { styles } from "./styles";
import { COLORS } from "@/styles";

interface Props {
  id: string;
}

export function MessageComposer({ id }: Props) {
  const message = useRef("");
  const { mutate } = useSendMessage();

  const handleSendMessage = () => {
    mutate({ content: message.current, roomId: id });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <Input
          multiline
          placeholder="Message"
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
