import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminTheme } from '@/pages/modules/website-lembaga/pengaturan/warna/hooks'

const InstitutionWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminTheme()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#0F4D30',
      secondary: color?.warna_sekunder ?? '#f4f4f4',
    })
  }, [color])

  return <>{children}</>
}
export default InstitutionWebTheme
