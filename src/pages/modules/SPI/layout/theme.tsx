import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemeSPI } from '@/pages/modules/SPI/settings/color/hooks'

const SPIThema = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemeSPI()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#1fa22c',
      'primary-foreground': color?.warna_sekunder ?? '#FFFFFF',
    })
  }, [color])

  return <>{children}</>
}
export default SPIThema
