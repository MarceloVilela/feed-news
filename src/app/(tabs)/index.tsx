// Rota-folha exigida pelo Expo Router para casar com "/" no build web.
// `_layout.tsx` deste grupo não renderiza `<Slot />` — ele monta seu próprio
// `Tab.Navigator` (React Navigation) independente do conteúdo desta rota —,
// então este componente nunca é exibido; sem ele, "/" fica "Unmatched Route".
export default function TabsIndex() {
  return null
}
