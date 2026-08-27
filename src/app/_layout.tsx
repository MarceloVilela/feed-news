import { ActivityIndicator, View } from 'react-native'
import { useColorScheme } from 'nativewind'
//import { styled } from "nativewind";
import { slate } from 'tailwindcss/colors'

// @ts-ignore
import '../../global.css'

import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { SettingsProvider } from '@/contexts/Settings'
import Article from '@/app/article'

import { origins as techOrigins } from '@/assets/json/tech/origins.json'
import { origins as gameOrigins } from '@/assets/json/game/origins.json'

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme()
  setColorScheme('dark')

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    //return <SplashScreen />;
    return (
      <View className="flex-1 justify-center dark">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SettingsProvider
      origin={techOrigins[0].title}
      originGame={gameOrigins[0].title}
    >
      <View
        style={{ flex: 1 }}
        className="relative flex-1 bg-slate-100 dark:bg-slate-900"
      >
        <StatusBar
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          translucent
        />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="article" />
          <Stack.Screen name="social-grid" />
        </Stack>
      </View>
    </SettingsProvider>
  )
}
