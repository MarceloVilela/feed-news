import { Image, Pressable, PressableProps, Text, View } from 'react-native'

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
      className="mx-4 mb-3 p-3 rounded-2xl flex-row bg-slate-100 dark:bg-slate-900"
    >
      <View className="flex-1 pr-3">
        <Text
          className="font-semibold text-base mb-1 text-zinc-600 dark:text-zinc-100"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          className="text-sm mb-2 text-zinc-500 dark:text-zinc-200"
          numberOfLines={2}
        >
          {item.summary}
        </Text>
        {item.source && item.time && (
          <Text className="text-xs text-zinc-400 dark:text-zinc-300">
            {item.source} · {`${item.time}`}
          </Text>
        )}
      </View>

      <Image
        source={{ uri: `${item.image}` }}
        className="w-24 h-24 rounded-xl"
        resizeMode="cover"
      />
    </Pressable>
  )
}
