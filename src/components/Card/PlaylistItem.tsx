import { Pressable, PressableProps, Text, View } from 'react-native'

export type Item = {
  index: number
  title: string
  avatar: string
  image: string
  artist: string
  duration: number
}

export type PlaylistItemProps = PressableProps & {
  item: Item
}

export default function PlaylistItem({ item, ...rest }: PlaylistItemProps) {
  return (
    <Pressable
      {...rest}
      className="px-4 py-4 border-b border-zinc-900 bg-black"
    >
      <View className="flex-row">
        <Text className="text-zinc-500 w-8">{` ${item.index}`}</Text>

        <View className="flex-1">
          <Text className="text-white font-semibold">{item.title}</Text>
          <Text className="text-zinc-400 mt-1">{item.artist}</Text>
        </View>

        <Text className="text-zinc-500">{` ${item.duration}`}</Text>
      </View>
    </Pressable>
  )
}
