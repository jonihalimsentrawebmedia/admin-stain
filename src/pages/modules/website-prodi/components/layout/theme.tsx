import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'

const ProdiWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  useEffect(() => {
    setTheme({
      primary: '#000000',
      'primary-foreground': '#959494',
    })
  }, [])

  return <>{children}</>
}
export default ProdiWebTheme
