import { Link } from "expo-router";

import { Text } from "@/components/text";

interface Props {
  name: string;
  id: string;
}

export function Chat({ name, id }: Props) {
  return (
    <Link
      href={{
        pathname: "/chat/[id]",
        params: { id, name },
      }}
    >
      <Text>{name}</Text>
    </Link>
  );
}
