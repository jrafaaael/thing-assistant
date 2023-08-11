import { StyleSheet, View } from "react-native";

import { ChatList } from "@/screens/home/components/chat-list";
import { Header } from "@/screens/home/components/header";
import { SPACING } from "@/styles";

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <Header />
      <ChatList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: SPACING.base,
  },
});
