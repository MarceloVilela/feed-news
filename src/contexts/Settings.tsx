import { createContext, ReactNode, useEffect, useState } from 'react'

interface SettingsContextData {
  origin: string
  originChange: (value: string) => void
  originGame: string
  originGameChange: (value: string) => void
}

interface SettingsProviderProps {
  children: ReactNode
  origin: string
  originGame: string
}

export const SettingsContext = createContext({} as SettingsContextData)

export function SettingsProvider({
  children,
  origin: originParam,
  originGame: originGameParam,
  ...rest
}: SettingsProviderProps) {
  const [origin, setOrigin] = useState(originParam)
  const [originGame, setOriginGame] = useState(originGameParam)

  function originChange(value: string) {
    setOrigin(value)
  }

  function originGameChange(value: string) {
    setOriginGame(value)
  }

  return (
    <SettingsContext.Provider
      value={{
        origin,
        originChange,
        originGame,
        originGameChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
