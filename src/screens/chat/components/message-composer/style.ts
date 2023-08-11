import { ICON_SIZE, SPACING } from "@/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: SPACING.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.xxs,
  },
  inputWrapper: {
    flex: 1,
    maxHeight: 110,
  },
  send: {
    padding: 10,
    paddingRight: 0,
  },
  sendIconWrapper: {
    width: ICON_SIZE.base,
    aspectRatio: 1,
  },
});
