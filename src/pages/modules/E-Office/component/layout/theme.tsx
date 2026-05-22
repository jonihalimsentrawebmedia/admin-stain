import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'

const EOfficeThema = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()

  useEffect(() => {
    setTheme({
      primary: '#14274E',
      'primary-foreground': 'rgb(141,171,223)',
    })
  }, [])

  return <>{children}</>
}
export default EOfficeThema
