import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Header } from "@/screens/chat/components/header";
import { MessageComposer } from "@/screens/chat/components/message-composer";
import { Text } from "@/components/text";
import { SPACING } from "@/styles";

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <View style={styles.wrapper}>
      <Header chatName={name} />
      <Text>id: {id}</Text>
      <MessageComposer />
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
