import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'

import { Content } from '@/types/content'
import { uniqueById } from '@/utils/uniqueById'
import { GridImage, HeroCard, NewsCard, PlaylistItem, PostCard } from '../Card'

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
  }
}

export default function ArticleList({ articles }: ArticleCardWithImageProps) {
  const router = useRouter()

  const _articles = useMemo(() => uniqueById(articles), [articles])

  const handleSeeMore = (url: string) =>
    router.push(`/article?url=${encodeURIComponent(url)}`)

  return (
    <FlashList
      data={_articles}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) =>
        renderCard({ layout: 'news', item, onPress: handleSeeMore })
      }
      showsVerticalScrollIndicator={false}
    />
  )
}
