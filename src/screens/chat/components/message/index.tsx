import { View } from "react-native";

import { Text } from "@/components/text";
import { Cohere } from "@/components/icons/cohere";
import { User } from "@/components/icons/user";
import { Message as IMessage } from "../../types/message";
import { styles } from "./styles";
import { COLORS } from "@/styles";

export function Message({ content, created_at, is_from_ai }: IMessage) {
  const sentAt = new Date(created_at).toLocaleString(undefined, {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={[styles.wrapper, is_from_ai ? styles.bot : styles.user]}>
      <View
        style={[
          styles.senderWrapper,
          is_from_ai ? styles.senderWrapperBot : styles.senderWrapperUser,
        ]}
      >
        <View style={styles.iconWrapper}>
          {is_from_ai ? (
            <Cohere fill={COLORS.zinc[50]} />
          ) : (
            <User fill={COLORS.zinc[50]} />
          )}
        </View>
        <Text isTitle size="sm">
          {is_from_ai ? "Cohere" : "You"}
        </Text>
        <Text>·</Text>
        <Text size="xs">{sentAt}</Text>
      </View>
      <View
        style={[
          styles.bubbleBase,
          is_from_ai ? styles.bubbleBot : styles.bubbleUser,
        ]}
      >
        <Text>{content}</Text>
      </View>
    </View>
  );
}
