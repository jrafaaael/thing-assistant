import { View } from "react-native";

import { Text } from "@/components/text";

interface Props {
  content: string;
}

export function Message({ content }: Props) {
  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
}
