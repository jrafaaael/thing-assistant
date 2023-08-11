import { Pressable, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import { ChatList } from "@/screens/home/components/chat-list";
import { useCreateChat } from "@/screens/home/hooks/use-create-chat";
import { Plus } from "@/components/icons/plus";
import { COLORS, ICON_SIZE, SPACING } from "@/styles";

export default function Home() {
  const { mutate } = useCreateChat();

  const handlePickFile = async () => {
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
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          title: "Chats",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable style={styles.upload} onPressIn={handlePickFile}>
              <View style={styles.uploadIconWrapper}>
                <Plus stroke={COLORS.blue.ios} />
              </View>
            </Pressable>
          ),
        }}
      />
      <ChatList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: SPACING.base,
  },
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
