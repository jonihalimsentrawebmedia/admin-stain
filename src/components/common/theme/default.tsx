import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'

const DefaultTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  useEffect(() => {
    setTheme({
      primary: '#0E874A',
      'primary-foreground': '#E1FFF0FF',
    })
  }, [])

  return <>{children}</>
}
export default DefaultTheme
