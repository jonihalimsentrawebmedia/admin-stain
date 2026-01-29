import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetColorPrimary } from '@/pages/modules/website-utama/settings-menu/color/hooks'

const DefaultTheme = ({ children }: { children: ReactNode }) => {
  const { colorPrimary } = UseGetColorPrimary()
  const { setTheme } = useThemeColor()
  useEffect(() => {
    setTheme({
      primary: colorPrimary?.warna_admin as string,
      'primary-foreground': '#E1FFF0FF',
    })
  }, [colorPrimary])

  return <>{children}</>
}
export default DefaultTheme
