import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { Text } from "@/components/text";
import { supabase } from "@/lib/supabase";

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

  const handleUploadFile = async () => {
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

    const { data, error } = await supabase.storage
      .from("pdf")
      .upload(fileBlob.name, body);

    console.log({ data, error });
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPressIn={handlePickFile}>
        <Text>Pick file</Text>
      </Pressable>
      <Pressable onPressIn={handleUploadFile}>
        <Text>Upload file</Text>
      </Pressable>
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
