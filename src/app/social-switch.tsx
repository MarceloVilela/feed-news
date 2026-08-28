import Icon from '@expo/vector-icons/Feather'
import { ComponentProps, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'tailwindcss/colors'
import _posts from '@/assets/json/posts.json'
import { HeroCard, NewsCard, PlaylistItem, PostCard } from '@/components/Card'

type Data = {
  id: number
  title: string
  slug: string
  imageAltText: string
  cover: string
}
const posts = { data: _posts.data as Data[] }

// 1. Define the layout map
type IconName = ComponentProps<typeof Icon>['name']
type LayoutType = 'news' | 'grid' | 'post' | 'hero' | 'song'

const LAYOUTS: { icon: IconName; type: LayoutType }[] = [
  { icon: 'paperclip', type: 'news' },
  { icon: 'divide-square', type: 'hero' },
  { icon: 'instagram', type: 'post' },
  { icon: 'music', type: 'song' },
]

// 2. Layout rendering component
const renderCard = (item: Data, layout: LayoutType) => {
  switch (layout) {
    case 'post':
      return (
        <PostCard
          item={{
            user: item.title,
            avatar: item.cover,
            image: item.cover,
            likes: item.id,
            caption: item.imageAltText,
          }}
        />
      )
    case 'news':
      return (
        <NewsCard
          item={{
            title: item.title,
            image: item.cover,
            summary: item.imageAltText,
            time: item.id,
            source: item.slug,
          }}
        />
      )
    case 'song':
      return (
        <PlaylistItem
          item={{
            index: item.id,
            avatar: item.cover,
            artist: item.slug,
            title: item.title,
            image: item.cover,
            duration: item.id,
          }}
        />
      )
    default:
      return (
        <HeroCard
          item={{
            title: item.title,
            image: item.cover,
            summary: item.imageAltText,
            category: item.slug,
            time: `${item.id}`,
            source: item.slug,
          }}
        />
      )
  }
}

export default function SocialSwitch() {
  const { bottom, top } = useSafeAreaInsets()

  const [layout, setLayout] = useState<LayoutType>('news')

  return (
    <View
      className="flex-1 bg-zinc-950 flex-col-reverse"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      {/* 3. Toggle buttons */}
      <View className="flex-row items-center justify-center gap-6 py-3">
        {LAYOUTS.map(({ icon, type }: { icon: IconName; type: LayoutType }) => (
          <Pressable key={type} onPress={() => setLayout(type)}>
            <Icon
              name={icon}
              size={32}
              color={layout === type ? colors.blue[500] : '#CCC'}
            />
          </Pressable>
        ))}
      </View>

      <FlatList
        data={posts.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderCard(item, layout)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
