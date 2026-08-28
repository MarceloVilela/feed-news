import Icon from '@expo/vector-icons/Feather'
import { useColorScheme } from 'nativewind'
import { useCallback, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles/colors'

interface Option {
  label: string
  value: string
}

interface SelectProps {
  selected: string
  options: Option[]
  handleOnChange: (value: string) => void
}

export default function Select({
  selected,
  options,
  handleOnChange,
}: SelectProps) {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  const [modalVisible, setModalVisible] = useState(false)

  const handleSwitchToFeed = useCallback(({ label }: { label: string }) => {
    setModalVisible(false)
    handleOnChange(label)
    //toggleColorScheme();
  }, [])

  return (
    <View className="flex items-end border-white mx-6">
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        accessibilityRole="button"
        accessibilityLabel={`Feed atual: ${selected}. Toque para trocar`}
        className="flex-row items-center border-border border-2 rounded-xl px-2"
      >
        <Text className="text-xl flex-1 text-text-primary dark:text-text-primary-dark">
          {selected}
        </Text>
        <Icon name="arrow-down" size={16} color={colors.border} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View className="flex flex-1 content-center px-4 pt-4 pb-8 mt-2 mb-8 border-2 bg-background dark:bg-background-dark">
          <View className="flex flex-1 w-full p-2 pb-8 rounded-lg bg-surface-modal dark:bg-surface-modal-dark">
            <Text className="text-xl font-light px-3 py-5 text-on-surface-modal dark:text-on-surface-modal-dark">
              Mudar para feed
            </Text>

            <ScrollView className="flex-1">
              {/* flex-row flex-wrap */}
              <View>
                {options.map(({ label, value }) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleSwitchToFeed({ label })}
                    accessibilityRole="button"
                    accessibilityLabel={`Trocar feed para ${label}`}
                    className="p-1 border-b-2 border-divider dark:border-divider-dark" //w-1/2
                    //style={{ borderColor: theme.foreground600 }}
                  >
                    <Text
                      className="text-lg font-light text-on-surface-modal dark:text-on-surface-modal-dark"
                      //style={{ color: theme.foreground500 }}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={toggleColorScheme}
              accessibilityRole="button"
              accessibilityLabel={
                colorScheme === 'dark'
                  ? 'Tema escuro ativo. Toque para mudar para o tema claro'
                  : 'Tema claro ativo. Toque para mudar para o tema escuro'
              }
              className="flex-row items-center gap-2 px-3 pt-4 mt-2 border-t-2 border-divider dark:border-divider-dark"
            >
              <Icon
                name={colorScheme === 'dark' ? 'moon' : 'sun'}
                size={18}
                color={
                  colorScheme === 'dark'
                    ? colors['on-surface-modal-dark']
                    : colors['on-surface-modal']
                }
              />
              <Text className="text-base text-on-surface-modal dark:text-on-surface-modal-dark">
                {colorScheme === 'dark' ? 'Tema escuro' : 'Tema claro'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
