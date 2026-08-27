import { Image, Pressable, PressableProps, Text, View } from 'react-native'

export type Item = {
  title: String
  image: String
  summary: String
  category?: String
  time?: String
  source?: String
}

export type HeroCardProps = PressableProps & {
  item: Item
}

export default function HeroCard({ item, ...rest }: HeroCardProps) {
  return (
    <Pressable
      {...rest}
      className="mx-4 mb-4 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900"
    >
      <Image
        source={{ uri: `${item.image}` }}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-4">
        {item.category && (
          <Text className="text-xs text-blue-500 font-semibold mb-2">
            {item.category}
          </Text>
        )}
        <Text className="text-xl font-bold leading-6 mb-2 text-zinc-900 dark:text-zinc-100">
          {item.title}
        </Text>
        <Text className="mb-3 text-zinc-600 dark:text-zinc-300">
          {item.summary}
        </Text>
        {item.time && item.source && (
          <Text className="text-zinc-400 dark:text-zinc-400 text-sm">
            {item.source} · {item.time}
          </Text>
        )}
      </View>
    </Pressable>
  )
}
