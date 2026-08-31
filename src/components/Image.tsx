import { Image as ExpoImage } from 'expo-image'
import { cssInterop } from 'nativewind'

// Registra `className` -> `style` uma única vez, num ponto central, para que os
// cards de src/components/Card possam usar expo-image (cache em disco/memória)
// com a mesma API de className já usada no resto do app via NativeWind.
cssInterop(ExpoImage, { className: 'style' })

export { ExpoImage as Image }
