import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetUnitPrimary } from '@/pages/modules/website-unit/settings/color/hooks'

const UnitWebLembagaTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { colorPrimary } = UseGetUnitPrimary()

  useEffect(() => {
    setTheme({
      primary: '#0F4D30',
      'primary-foreground': '#f4f4f4',
    })
  }, [colorPrimary])

  return <>{children}</>
}
export default UnitWebLembagaTheme
