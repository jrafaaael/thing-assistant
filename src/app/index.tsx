import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

import { Text } from "@/components/text";
import { Plus } from "@/components/icons/plus";

export default function Home() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  );

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.canceled) {
      return;
    }

    setFile(result);
  };

  const handleUploadFile = () => {
    if (!file) {
      return;
    }

    const fileBlob = {
      uri: file.assets?.[0].uri,
      name: file.assets?.[0].name,
      type: file.assets?.[0].mimeType,
    } as unknown as Blob;
    const body = new FormData();

    body.append("file", fileBlob);
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
    justifyContent: "center",
    alignItems: "center",
  },
});
