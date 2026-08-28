import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import env from '@/../env'
import { origins } from '@/assets/json/tech/origins.json'
import placeholder from '@/assets/json/tech/placeholder.json'
import ArticleList from '@/components/ArticleList'
import Select from '@/components/Select'
import { SettingsContext } from '@/contexts/Settings'
import { api } from '@/lib/api'
import delay from '@/utils/delay'

const options = origins.map(({ title, url }) => ({ label: title, value: url }))

export interface Content {
  id: string
  link: string
  title: string
  thumb: string
  created_at: string
  posted_at?: string
}

export interface NewsResponse {
  data: Content[]
  total: number
}

export default function TechArticles() {
  const { origin, originChange } = useContext(SettingsContext)

  const { bottom, top } = useSafeAreaInsets()

  const [articles, setArticles] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const lastGoodOrigin = useRef<string | null>(null)

  const loadArticles = useCallback(() => {
    async function load() {
      let url = origins[0].url
      const originCurrent = origins.filter(({ title }) => title === origin)
      if (originCurrent.length) {
        url = originCurrent[0].url
      }

      setLoading(true)
      setError(false)
      try {
        // api.defaults.baseURL + `/tech/source?url=${url}`
        const response = await api.get<NewsResponse>(`/tech/source?url=${url}`)
        setArticles(response.data.data)
        lastGoodOrigin.current = origin
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [origin])

  async function loadPlaceholder() {
    setLoading(true)
    setError(false)
    await delay(1000)
    setArticles(placeholder.data)
    lastGoodOrigin.current = origin
    setLoading(false)
  }

  useEffect(() => {
    env.placeholder ? loadPlaceholder() : loadArticles()
  }, [origin, loadArticles])

  return (
    <View
      className="flex-1 px-2 gap-2 bg-background dark:bg-background-dark"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <Select
        selected={String(origin)}
        options={options}
        handleOnChange={originChange}
      />

      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <Text className="text-center text-base text-text-primary dark:text-text-primary-dark">
            Não foi possível carregar essa fonte agora.
          </Text>
          <TouchableOpacity
            onPress={loadArticles}
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar essa fonte de novo"
            className="rounded-lg border-2 border-border px-4 py-2"
          >
            <Text className="text-text-primary dark:text-text-primary-dark">
              Tentar de novo
            </Text>
          </TouchableOpacity>
          {lastGoodOrigin.current && lastGoodOrigin.current !== origin && (
            <TouchableOpacity
              onPress={() => originChange(lastGoodOrigin.current as string)}
              accessibilityRole="button"
              accessibilityLabel={`Voltar para a fonte anterior, ${lastGoodOrigin.current}`}
              className="rounded-lg px-4 py-2"
            >
              <Text className="text-text-primary dark:text-text-primary-dark underline">
                Voltar para {lastGoodOrigin.current}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ArticleList articles={articles} />
      )}
    </View>
  )
}
