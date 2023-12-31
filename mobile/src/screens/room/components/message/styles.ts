import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: "80%",
    gap: SPACING.xxs / 2,
  },
  bot: {
    alignSelf: "flex-start",
  },
  user: {
    alignSelf: "flex-end",
  },
  senderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs / 2,
  },
  senderWrapperBot: {
    alignSelf: "flex-start",
  },
  senderWrapperUser: {
    alignSelf: "flex-end",
  },
  iconWrapper: {
    width: 10,
    aspectRatio: 1,
  },
  senderText: {
    color: COLORS.zinc[400],
  },
  bubbleBase: {
    paddingVertical: SPACING.xxs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.zinc[800],
    borderRadius: 20,
  },
  bubbleBot: {
    backgroundColor: COLORS.blue.ios,
    borderTopLeftRadius: 5,
  },
  bubbleUser: {
    borderTopRightRadius: 5,
  },
});
