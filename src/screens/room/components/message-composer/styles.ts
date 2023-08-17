import { StyleSheet } from "react-native";
import { ICON_SIZE, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  wrapper: {
    paddingTop: SPACING.xxs,
    paddingBottom: SPACING.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.xxs,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    maxHeight: 114,
  },
  send: {
    marginTop: "auto",
    padding: 10,
    paddingRight: 0,
  },
  sendIconWrapper: {
    width: ICON_SIZE.base,
    aspectRatio: 1,
  },
});
