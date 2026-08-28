// Fonte única de cor do app — nomeada por papel/componente, light + dark lado a lado.
// Cada valor documenta a classe Tailwind bruta que substituiu (achado #13/#15,
// migração de `slate-*`/`zinc-*`/`gray-*`/`blue-*` soltos no JSX para tokens nomeados).
export const colors = {
  // Fundo de tela e de card — usado em _layout, tabs, telas de artigo, HeroCard, NewsCard, Select
  background: '#F1F5F9', // slate-100
  'background-dark': '#0F172A', // slate-900

  // Texto primário — Select (label selecionado), branch legado de ArticleList
  'text-primary': '#0F172A', // slate-900
  'text-primary-dark': '#F1F5F9', // slate-100

  // HeroCard
  'hero-title': '#18181B', // zinc-900
  'hero-title-dark': '#F4F4F5', // zinc-100
  'hero-summary': '#52525B', // zinc-600
  'hero-summary-dark': '#D4D4D8', // zinc-300
  'hero-meta': '#A1A1AA', // zinc-400 (igual nos dois temas no código original)

  // NewsCard
  'news-title': '#52525B', // zinc-600
  'news-title-dark': '#F4F4F5', // zinc-100
  'news-summary': '#71717A', // zinc-500
  'news-summary-dark': '#E4E4E7', // zinc-200
  'news-meta': '#A1A1AA', // zinc-400
  'news-meta-dark': '#D4D4D8', // zinc-300

  // Destaque (categoria no HeroCard) — sem variante escura própria no código original
  accent: '#3B82F6', // blue-500

  // Select
  border: '#94A3B8', // slate-400 (borda do botão, estático)
  divider: '#CBD5E1', // slate-300 (linha entre opções, sobre folha clara)
  'divider-dark': '#E5E7EB', // gray-200 (linha entre opções, sobre folha escura)
  'surface-modal': '#FFFFFF', // white (folha do modal, tema claro)
  'surface-modal-dark': '#1E293B', // slate-800 (folha do modal, tema escuro)
  'on-surface-modal': '#000000', // preto (texto sobre a folha do modal, tema claro — contraste máximo)
  'on-surface-modal-dark': '#FFFFFF', // white (texto sobre a folha do modal, tema escuro)

  // ArticleList — branch legado do renderCard (hoje inalcançável, layout fixo em "news")
  link: '#1D4ED8', // blue-700
  'link-dark': '#CBD5E1', // slate-300
  'icon-link': '#334155', // slate-700
  'dot-muted': '#F9FAFB', // gray-50
  'text-faint': '#F3F4F6', // gray-100

  // Tab bar ((tabs)/_layout.tsx)
  'tab-inactive': '#CBD5E1', // slate-300
}
