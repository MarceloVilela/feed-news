import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import gameOrigins from '@/assets/json/game/origins.json'
import { origins } from '@/assets/json/tech/origins.json'
import { SettingsProvider } from '@/contexts/Settings'
import Layout from './_layout'

const page = <Layout />

export default function Home() {
  return (
    <SettingsProvider
      origin={origins[0].title}
      originGame={gameOrigins.origins[0].title}
    >
      <NavigationContainer>{page}</NavigationContainer>
    </SettingsProvider>
  )
}

registerRootComponent(Home)
