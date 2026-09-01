import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import env from '@/../env'
import { api } from '@/lib/api'
import { Content, NewsResponse } from '@/types/content'
import delay from '@/utils/delay'

interface Origin {
  title: string
  url: string
}

interface UseOriginFeedParams {
  origins: Origin[]
  placeholder: NewsResponse
  apiPath: '/tech/source' | '/game/source'
  origin: string
  originChange: (value: string) => void
}

interface UseOriginFeedResult {
  articles: Content[]
  loading: boolean
  isFetching: boolean
  error: boolean
  retry: () => void
  lastGoodOrigin: string | null
  goToLastGoodOrigin: () => void
}

export function useOriginFeed({
  origins,
  placeholder,
  apiPath,
  origin,
  originChange,
}: UseOriginFeedParams): UseOriginFeedResult {
  const lastGoodOrigin = useRef<string | null>(null)

  const originCurrent = origins.find(({ title }) => title === origin)
  const url = originCurrent ? originCurrent.url : origins[0].url

  const { data, isLoading, isFetching, isError, isSuccess, refetch } = useQuery(
    {
      queryKey: ['originFeed', apiPath, origin],
      queryFn: async () => {
        if (env.placeholder) {
          await delay(1000)
          return placeholder
        }
        const response = await api.get<NewsResponse>(`${apiPath}?url=${url}`)
        return response.data
      },
      placeholderData: keepPreviousData,
    },
  )

  useEffect(() => {
    if (isSuccess) {
      lastGoodOrigin.current = origin
    }
  }, [isSuccess, origin])

  return {
    articles: data?.data ?? [],
    loading: isLoading,
    isFetching,
    error: isError,
    retry: () => {
      refetch()
    },
    lastGoodOrigin: lastGoodOrigin.current,
    goToLastGoodOrigin: () => {
      if (lastGoodOrigin.current) {
        originChange(lastGoodOrigin.current)
      }
    },
  }
}
