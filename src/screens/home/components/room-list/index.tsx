import { FlatList } from "react-native";

import { RoomItem } from "../room-item";
import { useGetRoomList } from "../../hooks/use-get-room-list";

export function RoomList() {
  const { data } = useGetRoomList();

  return (
    <FlatList
      data={data}
      renderItem={({ item: { name, id } }) => <RoomItem name={name} id={id} />}
      keyExtractor={({ id }) => id}
    />
  );
}
