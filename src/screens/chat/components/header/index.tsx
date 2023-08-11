import { Stack } from "expo-router";

interface Props {
  chatName: string;
}

export function Header({ chatName }: Props) {
  return (
    <Stack.Screen
      options={{
        title: chatName,
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
        },
        headerTitleAlign: "center",
      }}
    />
  );
}
