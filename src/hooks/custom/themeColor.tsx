import { useEffect, useState } from 'react'

const THEME_KEY = 'theme-color'

export type ThemeColor = Record<string, string>

export const applyTheme = (theme: ThemeColor) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value)
  })
}

export const getStoredTheme = (): ThemeColor | null => {
  const stored = localStorage.getItem(THEME_KEY)
  try {
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export const useThemeColor = () => {
  const [theme, setThemeState] = useState<ThemeColor | null>(getStoredTheme())

  const setTheme = (newTheme: ThemeColor) => {
    localStorage.setItem(THEME_KEY, JSON.stringify(newTheme))
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  useEffect(() => {
    if (theme) applyTheme(theme)
  }, [theme])

  return { theme, setTheme }
}
