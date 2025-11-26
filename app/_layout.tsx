import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import "./globals.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#0f0f0f",
    surface: "#1a1a1a",
    primary: "#7c3aed",
    secondary: "#a78bfa",
    elevation: {
      level0: "#0f0f0f",
      level1: "#1a1a1a",
      level2: "#1a1a1a",
      level3: "#1a1a1a",
      level4: "#1a1a1a",
      level5: "#1a1a1a",
    },
  },
};

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen once layout is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <PaperProvider theme={darkTheme}>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
