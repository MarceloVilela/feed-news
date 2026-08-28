import { Dimensions, Image, Pressable, PressableProps } from 'react-native'

const NUM_COLUMNS = 3
const GAP = 1
const SIZE = Dimensions.get('window').width / NUM_COLUMNS - GAP * 2

export const GRID_CONFIG = {
  //NUM_COLUMNS,
  GAP,
  SIZE,
}

export type Item = {
  image: string
}

export type GridImageProps = PressableProps & {
  item: Item
}

export default function GridImage({ item, ...rest }: GridImageProps) {
  return (
    <Pressable
      {...rest}
      style={{ width: GRID_CONFIG.SIZE, margin: GRID_CONFIG.GAP }}
    >
      <Image
        source={{ uri: `${item.image}` }}
        className="w-full"
        style={{ aspectRatio: 1 }}
      />
    </Pressable>
  )
}
