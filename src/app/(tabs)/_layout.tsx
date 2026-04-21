import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { slate } from "tailwindcss/colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Feather";

import ArticlesTech from "./tech/articles/[origin]";
import ArticlesGame from "./game/articles/[origin]";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              colorScheme === "dark" ? slate["900"] : slate["100"],
          },
          tabBarActiveTintColor: slate["500"],
          tabBarInactiveTintColor: slate["300"],
        }}
      >
        <Tab.Screen
          name="tech/articles/[origin]"
          component={ArticlesTech}
          options={{
            tabBarLabel: "Tech",
            tabBarIcon: ({ color, size }) => (
              <Icon name="monitor" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="game/articles/[origin]"
          component={ArticlesGame}
          options={{
            tabBarLabel: "Game",
            tabBarIcon: ({ color, size }) => (
              <Icon name="twitch" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
