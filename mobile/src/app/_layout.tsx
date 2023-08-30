import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { COLORS } from "@/styles";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: COLORS.zinc[50],
          headerShadowVisible: false,
          contentStyle: styles.content,
          animation: "slide_from_right",
          // This doesn't work. Maybe is needed to create an issue on expo-router repo
          animationDuration: 200
        }}
      />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.zinc[900],
  },
  content: {
    backgroundColor: COLORS.zinc[950],
  },
});
