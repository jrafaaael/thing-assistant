import { Stack } from "expo-router";

interface Props {
  roomName: string;
}

export function Header({ roomName }: Props) {
  return (
    <Stack.Screen
      options={{
        title: roomName,
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
        },
        headerTitleAlign: "center",
      }}
    />
  );
}
