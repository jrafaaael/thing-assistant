import { FlatList, View } from "react-native";

import { RoomItem } from "../room-item";
import { useGetRoomList } from "../../hooks/use-get-room-list";
import { styles } from "./styles";

export function RoomList() {
  const { data } = useGetRoomList();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <RoomItem {...item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator}></View>}
    />
  );
}
