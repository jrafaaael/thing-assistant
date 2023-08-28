import { StyleSheet } from "react-native";
import { ICON_SIZE, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  upload: {
    width: SPACING.lg,
    height: ICON_SIZE.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIconWrapper: {
    width: ICON_SIZE.sm,
    height: ICON_SIZE.sm,
  },
});
