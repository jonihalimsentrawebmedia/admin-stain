import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetProdiPrimary } from '@/pages/modules/website-prodi/settings/color/hooks'

const ProdiWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { colorPrimary } = UseGetProdiPrimary()
  useEffect(() => {
    setTheme({
      primary: colorPrimary?.warna_admin as string,
      'primary-foreground': '#f4f4f4',
    })
  }, [colorPrimary])

  return <>{children}</>
}
export default ProdiWebTheme
