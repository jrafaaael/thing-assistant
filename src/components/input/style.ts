import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  base: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    backgroundColor: COLORS.neutral[900],
    borderRadius: 20,
    color: COLORS.neutral[50],
    fontSize: FONT_SIZE.base,
    fontFamily: "Inter-Regular",
  },
});
