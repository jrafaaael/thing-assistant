import { Pressable, View } from "react-native";

import { Input } from "@/components/input";
import { Send } from "@/components/icons/send";
import { styles } from "./style";
import { COLORS } from "@/styles";

export function MessageComposer() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <Input placeholder="Message" />
      </View>
      <Pressable style={styles.send}>
        <View style={styles.sendIconWrapper}>
          <Send stroke={COLORS.blue.ios} />
        </View>
      </Pressable>
    </View>
  );
}
