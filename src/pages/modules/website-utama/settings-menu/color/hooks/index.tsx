import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface colorPrimary {
  warna_halaman_utama: string
  warna_background_footer: string
  warna_admin: string
}

export const UseGetColorPrimary = () => {
  const [colorPrimary, setColorPrimary] = useState<colorPrimary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['color-primary'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/pengaturan-warna-halaman').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColorPrimary(data)
    }
  }, [data])

  return { colorPrimary, loading }
}
