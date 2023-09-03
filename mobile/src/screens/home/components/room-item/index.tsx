import { Pressable, View } from "react-native";
import { Link } from "expo-router";

import { Text } from "@/components/text";
import { formatDate } from "../../utils/format-date";
import { Room } from "../../types/room";
import { Body } from "./body";
import { styles } from "./styles";

interface Props extends Room {}

export function RoomItem({
  name,
  id,
  updatedAt,
  lastMessageContent,
  isFromAi,
}: Props) {
  return (
    <Link
      href={{
        pathname: "/rooms/[id]",
        params: { id, name },
      }}
      asChild
    >
      <Pressable style={styles.wrapper}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.roomName}>
            {name}
          </Text>
          <Text size="sm" style={styles.date}>
            {formatDate(new Date(updatedAt))}
          </Text>
        </View>
        <View style={styles.body}>
          {lastMessageContent ? (
            <Body isFromAi={Boolean(isFromAi)} content={lastMessageContent} />
          ) : (
            <Text></Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
}
