import { Text, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context"

import NLWLogo from '../../../src/assets/nlw-spacetime-logo.svg'

const lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export default function Select() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 px-8 border-white border-4"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <NLWLogo />
      <Text className="mt-10 text-xl text-white">{lorem}</Text>
    </View>
  )
}
