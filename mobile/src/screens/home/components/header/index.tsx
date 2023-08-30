import { Pressable, View } from "react-native";
import { Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import { useCreateRoom } from "../../hooks/use-create-room";
import { Plus } from "@/components/icons/plus";
import { COLORS } from "@/styles";
import { styles } from "./styles";

export function Header() {
  const { mutate } = useCreateRoom();

  const handleCreateRoom = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "application/pdf",
    });

    if (result.canceled) {
      return;
    }

    mutate({
      uri: result.assets?.[0].uri,
      name: result.assets?.[0].name,
      type: result.assets?.[0].mimeType!,
    });
  };

  return (
    <Stack.Screen
      options={{
        title: "Chats",
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
        },
        headerTitleAlign: "center",
        headerRight: () => (
          <Pressable style={styles.upload} onPressIn={handleCreateRoom}>
            <View style={styles.uploadIconWrapper}>
              <Plus stroke={COLORS.blue.ios} />
            </View>
          </Pressable>
        ),
      }}
    />
  );
}

