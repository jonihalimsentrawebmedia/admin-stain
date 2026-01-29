import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetUnitPrimary } from '@/pages/modules/website-unit/settings/color/hooks'

const UnitWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { colorPrimary } = UseGetUnitPrimary()
  useEffect(() => {
    setTheme({
      primary: colorPrimary?.warna_admin as string??'#000',
      'primary-foreground': '#f4f4f4',
    })
  }, [colorPrimary])

  return <>{children}</>
}
export default UnitWebTheme
