import { Pressable, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { Text } from "@/components/text";

export default function Home() {
  const handleFilePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    console.log(result);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPressIn={handleFilePicker}>
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
