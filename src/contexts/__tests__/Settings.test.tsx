import { fireEvent, render, screen } from '@testing-library/react-native'
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { SettingsContext, SettingsProvider } from '../Settings'

function Probe() {
  const { origin, originChange, originGame, originGameChange } =
    useContext(SettingsContext)

  return (
    <View>
      <Text testID="origin">{origin}</Text>
      <Text testID="originGame">{originGame}</Text>
      <TouchableOpacity
        testID="change-origin"
        onPress={() => originChange('changed-origin')}
      />
      <TouchableOpacity
        testID="change-origin-game"
        onPress={() => originGameChange('changed-origin-game')}
      />
    </View>
  )
}

describe('SettingsProvider', () => {
  it('exposes the initial origin/originGame values passed as props', async () => {
    await render(
      <SettingsProvider origin="olhar" originGame="gamev">
        <Probe />
      </SettingsProvider>,
    )

    expect(screen.getByTestId('origin')).toHaveTextContent('olhar')
    expect(screen.getByTestId('originGame')).toHaveTextContent('gamev')
  })

  it('originChange updates only origin, leaving originGame untouched', async () => {
    await render(
      <SettingsProvider origin="olhar" originGame="gamev">
        <Probe />
      </SettingsProvider>,
    )

    await fireEvent.press(screen.getByTestId('change-origin'))

    expect(screen.getByTestId('origin')).toHaveTextContent('changed-origin')
    expect(screen.getByTestId('originGame')).toHaveTextContent('gamev')
  })

  it('originGameChange updates only originGame, leaving origin untouched', async () => {
    await render(
      <SettingsProvider origin="olhar" originGame="gamev">
        <Probe />
      </SettingsProvider>,
    )

    await fireEvent.press(screen.getByTestId('change-origin-game'))

    expect(screen.getByTestId('origin')).toHaveTextContent('olhar')
    expect(screen.getByTestId('originGame')).toHaveTextContent(
      'changed-origin-game',
    )
  })
})
