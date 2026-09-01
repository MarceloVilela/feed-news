import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { origins } from '@/assets/json/game/origins.json'
import placeholder from '@/assets/json/game/placeholder.json'
import ArticleList from '@/components/ArticleList'
import Select from '@/components/Select'
import { ArticleListSkeleton, RefetchIndicator } from '@/components/Skeleton'
import { SettingsContext } from '@/contexts/Settings'
import { useOriginFeed } from '@/hooks/useOriginFeed'

const options = origins.map(({ title, url }) => ({ label: title, value: url }))

export default function GameArticles() {
  const { originGame: origin, originGameChange: originChange } =
    useContext(SettingsContext)

  const { bottom, top } = useSafeAreaInsets()

  const {
    articles,
    loading,
    isFetching,
    error,
    retry,
    lastGoodOrigin,
    goToLastGoodOrigin,
  } = useOriginFeed({
    origins,
    placeholder,
    apiPath: '/game/source',
    origin,
    originChange,
  })

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
        <ArticleListSkeleton />
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-3 px-6">
          <Text className="text-center text-base text-text-primary dark:text-text-primary-dark">
            Não foi possível carregar essa fonte agora.
          </Text>
          <TouchableOpacity
            onPress={retry}
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar essa fonte de novo"
            className="rounded-lg border-2 border-border px-4 py-2"
          >
            <Text className="text-text-primary dark:text-text-primary-dark">
              Tentar de novo
            </Text>
          </TouchableOpacity>
          {lastGoodOrigin && lastGoodOrigin !== origin && (
            <TouchableOpacity
              onPress={goToLastGoodOrigin}
              accessibilityRole="button"
              accessibilityLabel={`Voltar para a fonte anterior, ${lastGoodOrigin}`}
              className="rounded-lg px-4 py-2"
            >
              <Text className="text-text-primary dark:text-text-primary-dark underline">
                Voltar para {lastGoodOrigin}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {isFetching && <RefetchIndicator />}
          <ArticleList articles={articles} />
        </>
      )}
    </View>
  )
}
