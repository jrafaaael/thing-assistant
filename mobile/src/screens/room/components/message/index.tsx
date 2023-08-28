import { View } from "react-native";

import { Text } from "@/components/text";
import { Cohere } from "@/components/icons/cohere";
import { User } from "@/components/icons/user";
import { Message as IMessage } from "../../types/message";
import { styles } from "./styles";
import { COLORS } from "@/styles";

export function Message({ content, isFromAi }: IMessage) {
  return (
    <View style={[styles.wrapper, isFromAi ? styles.bot : styles.user]}>
      <View
        style={[
          styles.senderWrapper,
          isFromAi ? styles.senderWrapperBot : styles.senderWrapperUser,
        ]}
      >
        <View style={styles.iconWrapper}>
          {isFromAi ? (
            <Cohere fill={COLORS.zinc[400]} />
          ) : (
            <User fill={COLORS.zinc[400]} />
          )}
        </View>
        <Text size="sm" style={styles.senderText}>
          {isFromAi ? "Cohere" : "You"}
        </Text>
      </View>
      <View
        style={[
          styles.bubbleBase,
          isFromAi ? styles.bubbleBot : styles.bubbleUser,
        ]}
      >
        <Text>{content}</Text>
      </View>
    </View>
  );
}
