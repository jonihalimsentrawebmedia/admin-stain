import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemeUUID } from '../../settings/warna/hooks'

const PPIDWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } =  UseGetAdminThemeUUID()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#0F4D30',
      secondary: color?.warna_sekunder ?? '#f4f4f4',
    })
  }, [color])

  return <>{children}</>
}
export default PPIDWebTheme
