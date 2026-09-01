import { Text, View } from 'react-native'
import { SkeletonBlock } from './SkeletonBlock'

function SkeletonRow() {
  return (
    <View className="mx-4 mb-3 p-3 rounded-2xl flex-row bg-background dark:bg-background-dark">
      <View className="flex-1 pr-3 justify-center gap-2">
        <SkeletonBlock style={{ height: 14, width: '90%' }} />
        <SkeletonBlock style={{ height: 14, width: '60%' }} />
        <SkeletonBlock style={{ height: 12, width: '40%' }} />
      </View>
      <SkeletonBlock style={{ width: 96, height: 96, borderRadius: 12 }} />
    </View>
  )
}

type ArticleListSkeletonProps = {
  count?: number
}

// Anuncia o carregamento uma única vez pro leitor de tela (accessibilityLiveRegion),
// em vez de deixar TalkBack/VoiceOver tentar ler cada bloco cinza individualmente
// (por isso as linhas repetidas ficam escondidas da árvore de acessibilidade).
export function ArticleListSkeleton({ count = 6 }: ArticleListSkeletonProps) {
  return (
    <View className="flex-1">
      <Text
        accessible
        accessibilityLiveRegion="polite"
        accessibilityLabel="Carregando artigos"
        className="h-0 w-0 opacity-0"
      />
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {Array.from({ length: count }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: linhas puramente decorativas, sem identidade própria
          <SkeletonRow key={index} />
        ))}
      </View>
    </View>
  )
}
