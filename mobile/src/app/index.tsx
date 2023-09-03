import { StyleSheet, View } from "react-native";

import { RoomList } from "@/screens/home/components/room-list";
import { Header } from "@/screens/home/components/header";

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <Header />
      <RoomList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
