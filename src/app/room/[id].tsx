import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Header } from "@/screens/room/components/header";
import { MessageList } from "@/screens/room/components/message-list";
import { MessageComposer } from "@/screens/room/components/message-composer";
import { SPACING } from "@/styles";

export default function RoomScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <View style={styles.wrapper}>
      <Header roomName={name} />
      <MessageList />
      <MessageComposer id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.base,
    flex: 1,
    justifyContent: "space-between",
  },
});
