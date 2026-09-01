import { fireEvent, render, screen } from '@testing-library/react-native'

import { Content } from '@/types/content'
import ArticleList from '../index'

const mockPush = jest.fn()
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const articles: Content[] = [
  {
    id: '1',
    title: 'Netflix coloca app de controle para games na loja do iPhone',
    link: 'https://tecnoblog.net/noticias/netflix-app-controle',
    thumb: 'https://example.com/netflix.jpg',
    created_at: '2026-08-31T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Notebook Acer com GPU da Nvidia sai pelo menor preço',
    link: 'https://tecnoblog.net/achados/notebook-acer',
    thumb: 'https://example.com/acer.jpg',
    created_at: '2026-08-31T00:00:00.000Z',
  },
  // Duplicated id — ArticleList dedupes via uniqueById before rendering.
  {
    id: '1',
    title: 'Netflix coloca app de controle para games na loja do iPhone (dup)',
    link: 'https://tecnoblog.net/noticias/netflix-app-controle-dup',
    thumb: 'https://example.com/netflix-dup.jpg',
    created_at: '2026-08-31T00:00:00.000Z',
  },
]

describe('ArticleList', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders one card per unique article id, deduping repeated ids', async () => {
    await render(<ArticleList articles={articles} />)

    expect(screen.getByText(articles[0].title)).toBeTruthy()
    expect(screen.getByText(articles[1].title)).toBeTruthy()
    expect(screen.queryByText(/\(dup\)/)).toBeNull()
  })

  it('navigates to the article WebView with the encoded link when a card is pressed', async () => {
    await render(<ArticleList articles={articles} />)

    await fireEvent.press(
      screen.getByRole('button', { name: articles[1].title }),
    )

    expect(mockPush).toHaveBeenCalledWith(
      `/article?url=${encodeURIComponent(articles[1].link)}`,
    )
  })
})
