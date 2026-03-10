import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemeUUID } from '@/pages/modules/LPPM/settings/warna/hooks'

const LPPMWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemeUUID()

  useEffect(() => {
    setTheme({
      primary: (color?.warna_primer as string) ?? '#000',
      'primary-foreground': '#f4f4f4',
    })
  }, [color])

  return <>{children}</>
}
export default LPPMWebTheme
