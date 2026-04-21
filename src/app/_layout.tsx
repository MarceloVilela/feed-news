import { View } from 'react-native';
import { styled, useColorScheme } from 'nativewind';
import { slate } from 'tailwindcss/colors';

import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/Feather';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';

import { SettingsProvider } from '@/contexts/Settings';
import ArticlesTech from '@/app/tech/articles/[origin]';
import ArticlesGame from '@/app/game/articles/[origin]';
import Article from '@/app/article';

import { origins as techOrigins } from '@/assets/json/tech/origins.json';
import { origins as gameOrigins } from '@/assets/json/game/origins.json';
import Stripes from '@/assets/stripes.svg';

const StyledStripes = styled(Stripes);

const Tab = createBottomTabNavigator();

export default function Layout() {
    const { colorScheme } = useColorScheme();

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    });

    if (!hasLoadedFonts) {
        return <SplashScreen />;
    }

    return (
        <SettingsProvider origin={techOrigins[0].title} originGame={gameOrigins[0].title}>
            <View
                // source={blurBg}
                // imageStyle={{ position: 'absolute', left: '-100%' }}
                className="relative flex-1 bg-slate-50 dark:bg-slate-900"
            >
                <StyledStripes className="absolute left-2" />
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} translucent />

                {/* <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack> */}

                <Tab.Navigator
                    sceneContainerStyle={{ backgroundColor: 'transparent' }}
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: { backgroundColor: slate['100'] },
                        tabBarActiveTintColor: slate['500'],
                        tabBarInactiveTintColor: slate['300'],
                    }}
                >
                    <Tab.Screen
                        name="tech/articles/[origin]"
                        component={ArticlesTech}
                        options={{
                            tabBarLabel: 'Tech',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="monitor" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="game/articles/[origin]"
                        component={ArticlesGame}
                        options={{
                            tabBarLabel: 'Game',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="twitch" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="article"
                        component={Article}
                        options={{
                            tabBarButton: () => null,
                        }}
                    />
                </Tab.Navigator>
            </View>
        </SettingsProvider>
    );
}
