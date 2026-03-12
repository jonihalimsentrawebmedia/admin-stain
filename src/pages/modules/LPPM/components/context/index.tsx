import { createContext, type ReactNode, useContext, useState } from 'react'
import type { ISessionLPPM } from '@/pages/modules/LPPM/hooks'

interface AppContextType {
  profileSession?: ISessionLPPM
  setProfileSession: (value: ISessionLPPM) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const ProviderLPPM = ({ children }: { children: ReactNode }) => {
  const [profileSession, setProfileSession] = useState<ISessionLPPM>()

  return (
    <AppContext.Provider
      value={{
        profileSession,
        setProfileSession,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const UseLPPMContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }

  return context
}
