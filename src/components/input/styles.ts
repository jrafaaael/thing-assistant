import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  base: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 12,
    backgroundColor: COLORS.zinc[800],
    borderRadius: 22,
    color: COLORS.zinc[50],
    fontSize: FONT_SIZE.base,
    fontFamily: "Inter-Regular",
  },
});
