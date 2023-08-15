import { useState } from "react";
import { TextInput, TextInputProps, useWindowDimensions } from "react-native";

import { COLORS } from "@/styles";
import { styles } from "./styles";

export function Input({ style, ...props }: TextInputProps) {
  const [height, setHeight] = useState<number | null>(null);
  const { height: windowHeight } = useWindowDimensions();
  const { maxHeight } = style ?? { maxHeight: windowHeight };

  return (
    <TextInput
      style={[styles.base, props.multiline ? { height } : {}, style ?? {}]}
      placeholderTextColor={COLORS.neutral[500]}
      {...props}
      onContentSizeChange={(e) => {
        const height = Math.min(e.nativeEvent.contentSize.height, maxHeight);
        setHeight(height);
      }}
    />
  );
}
