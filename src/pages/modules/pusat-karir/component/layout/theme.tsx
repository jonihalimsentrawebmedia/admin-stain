import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemeCarrier } from '@/pages/modules/pusat-karir/settings/warna/hooks'

const CarrierWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemeCarrier()

  useEffect(() => {
    setTheme({
      primary: (color?.warna_primer as string) ?? '#000',
      'primary-foreground': '#f4f4f4',
    })
  }, [color])

  return <>{children}</>
}
export default CarrierWebTheme
