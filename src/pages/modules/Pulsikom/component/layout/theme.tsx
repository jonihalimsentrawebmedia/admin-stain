import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemePulsikom } from '../../settings/color/hooks/index'

const PulsikomThema = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemePulsikom()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#1fa22c',
      'primary-foreground': color?.warna_sekunder ?? '#FFFFFF',
    })
  }, [color])

  return <>{children}</>
}
export default PulsikomThema
