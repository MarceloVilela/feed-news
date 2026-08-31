import AsyncStorage from '@react-native-async-storage/async-storage'

const THEME_KEY = '@feed-news:color-scheme'

export type ColorScheme = 'light' | 'dark'

export async function getStoredColorScheme(): Promise<ColorScheme | null> {
  const value = await AsyncStorage.getItem(THEME_KEY)
  return value === 'light' || value === 'dark' ? value : null
}

export async function setStoredColorScheme(value: ColorScheme) {
  await AsyncStorage.setItem(THEME_KEY, value)
}
