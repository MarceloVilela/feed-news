import { useColorScheme } from 'nativewind'
import { useEffect, useRef } from 'react'
import { Animated, Platform, type ViewStyle } from 'react-native'
import { colors } from '@/styles/colors'

type SkeletonBlockProps = {
  style?: ViewStyle
}

// Bloco decorativo — o container de ArticleListSkeleton já esconde estes
// blocos do leitor de tela (accessibilityElementsHidden), então nenhuma prop
// de acessibilidade é necessária aqui.
export function SkeletonBlock({ style }: SkeletonBlockProps) {
  const { colorScheme } = useColorScheme()
  const opacity = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]),
    )
    pulse.start()
    return () => pulse.stop()
  }, [opacity])

  const backgroundColor =
    colorScheme === 'dark' ? colors['skeleton-dark'] : colors.skeleton

  return (
    <Animated.View
      style={[{ borderRadius: 8, backgroundColor, opacity }, style]}
    />
  )
}
