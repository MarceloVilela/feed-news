import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import posts from '@/assets/json/posts.json'
import { GridImage } from '@/components/Card'

export default function Social() {
  const { bottom, top } = useSafeAreaInsets()

  return (
    <View
      className="flex-1 bg-zinc-950"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <FlashList
        data={posts.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <GridImage item={{ image: item.cover }} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
