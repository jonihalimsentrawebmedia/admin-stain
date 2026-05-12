import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemePMB } from '@/pages/modules/PMB/settings/color/hooks'

const PMBThema = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemePMB()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#1fa22c',
      'primary-foreground': color?.warna_sekunder ?? '#FFFFFF',
    })
  }, [color])

  return <>{children}</>
}
export default PMBThema
