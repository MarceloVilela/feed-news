import { useEffect, useRef } from 'react'
import { Animated, Platform } from 'react-native'
import { colors } from '@/styles/colors'

// Barra fina no topo da lista, usada quando já existe conteúdo em cache
// (troca de origem já visitada na sessão) — evita substituir a lista inteira
// por um spinner/skeleton de tela cheia. Puramente decorativa: a troca de
// origem em si já é anunciada pelo Select, então fica escondida do leitor de
// tela pra não gerar ruído a cada troca.
export function RefetchIndicator() {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]),
    )
    pulse.start()
    return () => pulse.stop()
  }, [opacity])

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ height: 3, backgroundColor: colors.accent, opacity }}
    />
  )
}
