import { Stack } from "expo-router";

interface Props {
  roomName: string;
}

export function Header({ roomName }: Props) {
  const [filename, extension] = roomName.split(".");

  return (
    <Stack.Screen
      options={{
        title: `${filename.slice(0, 20)}.${extension}`,
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
        },
        headerTitleAlign: "center",
      }}
    />
  );
}
