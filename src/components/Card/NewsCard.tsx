import { Pressable, PressableProps, Text, View } from 'react-native'
import { Image } from '@/components/Image'

export type Item = {
  title: string
  image: string
  summary: string
  time?: number
  source?: string
}

export type NewsCardProps = PressableProps & {
  item: Item
}

export default function NewsCard({ item, ...rest }: NewsCardProps) {
  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      className="mx-4 mb-3 p-3 rounded-2xl flex-row bg-background dark:bg-background-dark"
    >
      <View className="flex-1 pr-3">
        <Text
          className="font-semibold text-base mb-1 text-news-title dark:text-news-title-dark"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          className="text-sm mb-2 text-news-summary dark:text-news-summary-dark"
          numberOfLines={2}
        >
          {item.summary}
        </Text>
        {item.source && item.time && (
          <Text className="text-xs text-news-meta dark:text-news-meta-dark">
            {item.source} · {`${item.time}`}
          </Text>
        )}
      </View>

      <Image
        source={{ uri: `${item.image}` }}
        accessible={false}
        className="w-24 h-24 rounded-xl"
        contentFit="cover"
      />
    </Pressable>
  )
}
