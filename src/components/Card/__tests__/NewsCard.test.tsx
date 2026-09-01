import { fireEvent, render, screen } from '@testing-library/react-native'

import NewsCard from '../NewsCard'

const item = {
  title: 'Notebook Acer com GPU da Nvidia sai pelo menor preço',
  image: 'https://example.com/thumb.jpg',
  summary: 'https://tecnoblog.net/achados/2023/08/08/notebook-acer',
}

describe('NewsCard', () => {
  it('renders title and summary', async () => {
    await render(<NewsCard item={item} onPress={() => {}} />)

    expect(screen.getByText(item.title)).toBeTruthy()
    expect(screen.getByText(item.summary)).toBeTruthy()
  })

  it('exposes an accessible button labeled with the article title', async () => {
    await render(<NewsCard item={item} onPress={() => {}} />)

    expect(screen.getByRole('button', { name: item.title })).toBeTruthy()
  })

  it('calls onPress when tapped', async () => {
    const onPress = jest.fn()
    await render(<NewsCard item={item} onPress={onPress} />)

    await fireEvent.press(screen.getByRole('button', { name: item.title }))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('renders source and time only when both are present', async () => {
    await render(<NewsCard item={item} onPress={() => {}} />)
    expect(screen.queryByText(/·/)).toBeNull()

    await render(
      <NewsCard
        item={{ ...item, source: 'Tecnoblog', time: 1723161600 }}
        onPress={() => {}}
      />,
    )
    expect(screen.getByText('Tecnoblog · 1723161600')).toBeTruthy()
  })
})
