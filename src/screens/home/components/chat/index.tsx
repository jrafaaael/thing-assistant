import { Text } from "@/components/text";
import { View } from "react-native";

interface Props {
  name: string;
}

export function Chat({ name }: Props) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
