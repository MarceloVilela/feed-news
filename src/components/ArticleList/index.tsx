import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { Content } from '@/app/(tabs)/tech/articles/[origin]'
import { colors } from '@/styles/colors'
import { uniqueById } from '@/utils/uniqueById'
import { GridImage, HeroCard, NewsCard, PlaylistItem, PostCard } from '../Card'

dayjs.locale(ptBR)

interface ArticleCardWithImageProps {
  articles: Content[]
}

type LayoutType = 'news' | 'grid' | 'post' | 'hero' | 'playlist'

type RenderCardProps = {
  item: Content
  layout: LayoutType
  onPress: (url: string) => void
}

const renderCard = ({ layout, item, onPress }: RenderCardProps) => {
  switch (layout) {
    case 'grid':
      return (
        <GridImage
          item={{
            image: item.thumb,
          }}
          onPress={() => {
            console.warn('AQUI')
            onPress(item.link)
          }}
        />
      )
    case 'hero':
      return (
        <HeroCard
          item={{
            title: item.title,
            image: item.thumb,
            summary: item.link,
            //category: item.title,
            //time: item.title,
            //source: item.title,
          }}
          onPress={() => {
            console.warn('AQUI')
            onPress(item.link)
          }}
        />
      )
    case 'news':
      return (
        <NewsCard
          item={{
            title: item.title,
            image: item.thumb,
            summary: item.link,
          }}
          onPress={() => onPress(item.link)}
        />
      )
    case 'playlist':
      return (
        <PlaylistItem
          item={{
            index: Math.floor(Math.random() * 1000) + 1,
            title: item.title,
            avatar: item.thumb,
            image: item.thumb,
            artist: item.link,
            duration: Math.floor(Math.random() * 1000) + 1,
          }}
          onPress={() => {
            console.warn('AQUI')
            onPress(item.link)
          }}
        />
      )
    case 'post':
      return (
        <PostCard
          item={{
            //user: item.link.split("/")[2],
            user: item.title,
            avatar: item.thumb,
            image: item.thumb,
            //likes: Math.floor(Math.random() * 1000) + 1,
            caption: item.link,
          }}
          onPress={() => {
            console.warn('AQUI')
            onPress(item.link)
          }}
        />
      )
    default:
      return (
        <TouchableOpacity
          className="mb-4"
          accessibilityRole="button"
          accessibilityLabel={item.title}
          onPress={() => onPress(item.link)}
        >
          <View className="hidden flex-row items-center">
            <View className="h-px w-5 bg-dot-muted" />
            <Text className="font-body text-sm text-text-faint">
              {dayjs(item.posted_at).format('D[ de ]MMMM[, ]YYYY')}
            </Text>
          </View>
          <View className="space-y-4 px-0">
            <Image
              source={{ uri: item.thumb }}
              className="aspect-video w-full rounded-lg"
              accessible={false}
              alt=""
            />
            <View className="px-2">
              <Text className="font-body text-xl leading-relaxed text-text-primary dark:text-text-primary-dark">
                {item.title}
              </Text>

              <TouchableOpacity
                className="flex-row items-center gap-2"
                accessibilityRole="button"
                accessibilityLabel="Ler mais"
                onPress={() => onPress(item.link)}
              >
                <Text className="font-body text-md text-link dark:text-link-dark">
                  Ler mais
                </Text>
                <Icon
                  name="arrow-right"
                  size={16}
                  color={colors['icon-link']}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )
  }
}

export default function ArticleList({ articles }: ArticleCardWithImageProps) {
  const router = useRouter()

  const _articles = useMemo(() => uniqueById(articles), [articles])

  const handleSeeMore = (url: string) =>
    router.push(`/article?url=${encodeURIComponent(url)}`)

  return (
    <FlatList
      data={_articles}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) =>
        renderCard({ layout: 'news', item, onPress: handleSeeMore })
      }
      showsVerticalScrollIndicator={false}
    />
  )
}
