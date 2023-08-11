import { TextInput, TextInputProps } from "react-native";

import { COLORS } from "@/styles";
import { styles } from "./styles";

export function Input({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={[styles.base, style ?? {}]}
      placeholderTextColor={COLORS.neutral[500]}
      {...props}
    />
  );
}
