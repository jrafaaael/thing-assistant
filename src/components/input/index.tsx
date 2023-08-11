import { TextInput, TextInputProps } from "react-native";

import { COLORS } from "@/styles";
import { styles } from "./style";

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      style={styles.base}
      placeholderTextColor={COLORS.neutral[500]}
      {...props}
    />
  );
}
