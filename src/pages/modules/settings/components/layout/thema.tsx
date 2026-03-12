import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'

const ThemeSettings = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  useEffect(() => {
    setTheme({
      primary: '#00703C',
      'primary-foreground': '#E1FFF0FF',
    })
  }, [])

  return <>{children}</>
}
export default ThemeSettings
