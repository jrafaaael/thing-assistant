import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/styles";

export const styles = StyleSheet.create({
  wrapper: {
    padding: SPACING.base,
    gap: SPACING.xxs,
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 60,
  },
  roomName: {
    flex: 1,
  },
  date: {
    color: COLORS.zinc[500],
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs / 2,
  },
  content: {
    color: COLORS.zinc[500],
  },
  message: {
    flex: 1,
  },
  iconWrapper: {
    width: 10,
    aspectRatio: 1,
  },
});
