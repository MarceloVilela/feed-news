import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { slate } from "tailwindcss/colors";

import { origins } from "@/assets/json/tech/origins.json";
import gameOrigins from "@/assets/json/game/origins.json";
import { SettingsProvider } from "@/contexts/Settings";

import Articles from "@/app/(tabs)/tech/articles/[origin]";
import Layout from "./_layout";
import { registerRootComponent } from "expo";
const page = <Layout />;
const page2 = <Articles />;

export default function Home() {
  return (
    <SettingsProvider
      origin={origins[0].title}
      originGame={gameOrigins.origins[0].title}
    >
      <NavigationContainer>{page}</NavigationContainer>
    </SettingsProvider>
  );
}

registerRootComponent(Home);
