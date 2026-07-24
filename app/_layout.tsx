import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { TamaguiProvider } from "tamagui";
import { View } from "react-native";

import { store } from "../src/store/store";
import { tamaguiConfig } from "../tamagui.config";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="shoe/[id]" options={{ headerShown: false }} />
          </Stack>

          <FlashMessage position="top" />

          <StatusBar style="dark" />
        </SafeAreaView>
      </TamaguiProvider>
    </Provider>
  );
}
