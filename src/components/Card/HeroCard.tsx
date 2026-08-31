import { Pressable, PressableProps, Text, View } from 'react-native'
import { Image } from '@/components/Image'

export type Item = {
  title: string
  image: string
  summary: string
  category?: string
  time?: string
  source?: string
}

export type HeroCardProps = PressableProps & {
  item: Item
}

export default function HeroCard({ item, ...rest }: HeroCardProps) {
  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      className="mx-4 mb-4 rounded-3xl overflow-hidden bg-background dark:bg-background-dark"
    >
      <Image
        source={{ uri: `${item.image}` }}
        accessible={false}
        className="w-full h-52"
        contentFit="cover"
      />
      <View className="p-4">
        {item.category && (
          <Text className="text-xs text-accent font-semibold mb-2">
            {item.category}
          </Text>
        )}
        <Text className="text-xl font-bold leading-6 mb-2 text-hero-title dark:text-hero-title-dark">
          {item.title}
        </Text>
        <Text className="mb-3 text-hero-summary dark:text-hero-summary-dark">
          {item.summary}
        </Text>
        {item.time && item.source && (
          <Text className="text-hero-meta dark:text-hero-meta text-sm">
            {item.source} · {item.time}
          </Text>
        )}
      </View>
    </Pressable>
  )
}
