import { type ReactNode, useEffect } from 'react'
import { useThemeColor } from '@/hooks/custom/themeColor.tsx'
import { UseGetAdminThemeFaculty } from '@/pages/modules/website-fakultas/settings/color/hooks'

const FacultyWebTheme = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useThemeColor()
  const { color } = UseGetAdminThemeFaculty()

  useEffect(() => {
    setTheme({
      primary: color?.warna_primer ?? '#1fa22c',
      'primary-foreground': color?.warna_sekunder ?? '#FFFFFF',
    })
  }, [color])

  return <>{children}</>
}
export default FacultyWebTheme
