import { fireEvent, render, screen } from '@testing-library/react-native'

import Select from '../index'

const options = [
  { label: 'OlharDigital', value: 'olhardigital' },
  { label: 'GizModo', value: 'gizmodo' },
]

describe('Select', () => {
  it('shows the currently selected origin', async () => {
    await render(
      <Select
        selected="OlharDigital"
        options={options}
        handleOnChange={() => {}}
      />,
    )

    expect(screen.getByText('OlharDigital')).toBeTruthy()
  })

  it('opens the modal and lists every option when the trigger is pressed', async () => {
    await render(
      <Select
        selected="OlharDigital"
        options={options}
        handleOnChange={() => {}}
      />,
    )

    await fireEvent.press(
      screen.getByRole('button', { name: /Feed atual: OlharDigital/ }),
    )

    expect(
      screen.getByRole('button', { name: 'Trocar feed para GizModo' }),
    ).toBeTruthy()
  })

  it('calls handleOnChange with the picked origin and closes the modal', async () => {
    const handleOnChange = jest.fn()
    await render(
      <Select
        selected="OlharDigital"
        options={options}
        handleOnChange={handleOnChange}
      />,
    )

    await fireEvent.press(
      screen.getByRole('button', { name: /Feed atual: OlharDigital/ }),
    )
    await fireEvent.press(
      screen.getByRole('button', { name: 'Trocar feed para GizModo' }),
    )

    expect(handleOnChange).toHaveBeenCalledWith('GizModo')
    expect(screen.queryByRole('button', { name: 'Fechar' })).toBeNull()
  })

  it('closes the modal via the explicit close button', async () => {
    await render(
      <Select
        selected="OlharDigital"
        options={options}
        handleOnChange={() => {}}
      />,
    )

    await fireEvent.press(
      screen.getByRole('button', { name: /Feed atual: OlharDigital/ }),
    )
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeTruthy()

    await fireEvent.press(screen.getByRole('button', { name: 'Fechar' }))

    expect(screen.queryByRole('button', { name: 'Fechar' })).toBeNull()
  })

  it('closes the modal when the backdrop (outside the sheet) is pressed', async () => {
    await render(
      <Select
        selected="OlharDigital"
        options={options}
        handleOnChange={() => {}}
      />,
    )

    await fireEvent.press(
      screen.getByRole('button', { name: /Feed atual: OlharDigital/ }),
    )
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeTruthy()

    await fireEvent.press(screen.getByTestId('select-backdrop'))

    expect(screen.queryByRole('button', { name: 'Fechar' })).toBeNull()
  })
})
