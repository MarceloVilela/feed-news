import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import posts from '@/assets/json/posts.json'
import { NewsCard } from '@/components/Card'

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
        renderItem={({ item }) => (
          <NewsCard
            item={{
              title: item.title,
              image: item.cover,
              summary: item.imageAltText,
              time: item.id,
              source: item.slug,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
