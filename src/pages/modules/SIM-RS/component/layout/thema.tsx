import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetColorSIMRS } from '@/pages/modules/SIM-RS/setting/color/hooks'
import { type ReactNode, useEffect } from 'react'

const SimRSColor = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetColorSIMRS()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primary ?? '#14274E',
      'primary-foreground': 'rgb(141,171,223)',
    })
  }, [color])

  return <>{children}</>
}
export default SimRSColor
