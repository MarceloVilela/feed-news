import Icon from '@expo/vector-icons/Feather'
import { useCallback, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { slate } from 'tailwindcss/colors'

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
  //const { colorScheme, toggleColorScheme } = useColorScheme()

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
        className="flex-row items-center border-slate-400 border-2 rounded-xl px-2"
      >
        <Text className="text-xl flex-1 text-slate-900 dark:text-slate-100">
          {selected}
        </Text>
        <Icon name="arrow-down" size={16} color={slate['400']} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View className="flex flex-1 content-center px-4 pt-4 pb-8 mt-2 mb-8 border-2 bg-slate-100 dark:bg-slate-900">
          <View className="flex w-full p-2 pb-8 rounded-lg bg-slate-800">
            <Text className="text-xl font-thin px-3 py-5 text-white">
              Mudar para feed
            </Text>

            <ScrollView>
              {/* flex-row flex-wrap */}
              <View>
                {options.map(({ label, value }) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleSwitchToFeed({ label })}
                    className="p-1 border-b-2 border-gray-200" //w-1/2
                    //style={{ borderColor: theme.foreground600 }}
                  >
                    <Text
                      className="text-xl font-thin text-white"
                      //style={{ color: theme.foreground500 }}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}
