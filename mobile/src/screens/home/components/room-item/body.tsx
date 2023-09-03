import { View } from "react-native";

import { Text } from "@/components/text";
import { Cohere } from "@/components/icons/cohere";
import { User } from "@/components/icons/user";
import { Message } from "@/types/message";
import { COLORS } from "@/styles";
import { styles } from "./styles";

interface Props extends Omit<Message, "id" | "createdAt" | "roomId"> {}

export function Body({ isFromAi, content }: Props) {
  return (
    <>
      <View style={styles.iconWrapper}>
        {isFromAi ? (
          <Cohere fill={COLORS.zinc[500]} />
        ) : (
          <User fill={COLORS.zinc[500]} />
        )}
      </View>
      <Text isTitle size="sm" style={styles.content}>
        {isFromAi ? "Cohere" : "You"}:
      </Text>
      <Text
        numberOfLines={1}
        size="sm"
        style={[styles.content, styles.message]}
      >
        {content}
      </Text>
    </>
  );
}
