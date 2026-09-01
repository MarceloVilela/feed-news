import { Pressable, PressableProps, Text, View } from 'react-native'
import { Image } from '@/components/Image'

export type Item = {
  user: string
  avatar: string
  image: string
  likes?: number
  caption: string
}

export type PostCardProps = PressableProps & {
  item: Item
}

export default function PostCard({ item, ...rest }: PostCardProps) {
  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      accessibilityLabel={`Ver post de ${item.user}`}
      className="mb-8"
    >
      <View className="flex-row items-center justify-between px-3 py-2">
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: `${item.avatar}` }}
            className="w-9 h-9 rounded-full"
          />
          <Text className="text-white font-semibold">{item.user}</Text>
        </View>
        <Text className="text-white text-xl">•••</Text>
      </View>

      <Image
        source={{ uri: `${item.image}` }}
        className="w-full h-[420px]"
        contentFit="cover"
      />

      <View className="px-3 pt-3 hidden">
        <View className="flex-row justify-between mb-2">
          <View className="flex-row gap-4">
            <Pressable>
              <Text className="text-white text-2xl">♡</Text>
            </Pressable>
            <Pressable>
              <Text className="text-white text-2xl">💬</Text>
            </Pressable>
            <Pressable>
              <Text className="text-white text-2xl">➤</Text>
            </Pressable>
          </View>
          <Pressable>
            <Text className="text-white text-2xl">🔖</Text>
          </Pressable>
        </View>

        {item.likes && (
          <Text className="text-white font-semibold mb-1">
            {`${item.likes} curtidas`}
          </Text>
        )}
        <Text className="text-white">
          <Text className="font-semibold">{item.user} </Text>
          {item.caption}
        </Text>
      </View>
    </Pressable>
  )
}
