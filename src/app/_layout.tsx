import { useColorScheme } from 'nativewind'
import { useEffect, useRef } from 'react'
import { ActivityIndicator, View } from 'react-native'

import '../../global.css'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { origins as gameOrigins } from '@/assets/json/game/origins.json'

import { origins as techOrigins } from '@/assets/json/tech/origins.json'
import { SettingsProvider } from '@/contexts/Settings'

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme()

  // Dark é o tema padrão ao abrir o app — a ref garante que roda uma única vez
  // mesmo que `setColorScheme` não seja uma referência estável entre renders
  // (senão o efeito reforça 'dark' de novo a cada toggle, cancelando o Select).
  const hasSetInitialTheme = useRef(false)
  useEffect(() => {
    if (!hasSetInitialTheme.current) {
      hasSetInitialTheme.current = true
      setColorScheme('dark')
    }
  }, [setColorScheme])

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    //return <SplashScreen />;
    return (
      <View className="flex-1 justify-center bg-background dark:bg-background-dark">
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
        className="relative flex-1 bg-background dark:bg-background-dark"
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
