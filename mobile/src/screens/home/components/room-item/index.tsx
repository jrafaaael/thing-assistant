import { Link } from "expo-router";

import { Text } from "@/components/text";
import { Room } from "../../types/room";

interface Props extends Room {}

export function RoomItem({ name, id, createdAt, messages }: Props) {
  return (
    <Link
      href={{
        pathname: "/rooms/[id]",
        params: { id, name },
      }}
    >
      <Text>{name}</Text>
    </Link>
  );
}
