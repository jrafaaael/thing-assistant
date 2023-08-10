import { Pressable, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import { Text } from "@/components/text";
import { Plus } from "@/components/icons/plus";
import { axios } from "@/lib/axios";
import { COLORS, ICON_SIZE, SPACING } from "@/styles";

export default function Home() {
  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "application/pdf",
    });

    if (result.canceled) {
      return;
    }

    const fileBlob = {
      uri: result.assets?.[0].uri,
      name: result.assets?.[0].name,
      type: result.assets?.[0].mimeType,
    } as unknown as Blob;

    const body = new FormData();
    body.append("file", fileBlob);

    const res = await axios.post(`/chat/ingest`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      <Text>dlskfj</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
