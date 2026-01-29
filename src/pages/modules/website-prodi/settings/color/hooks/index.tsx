import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface colorPrimary {
  warna_halaman_utama: string
  warna_background_footer: string
  warna_admin: string
}

export const UseGetProdiPrimary = () => {
  const [colorPrimary, setColorPrimary] = useState<colorPrimary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-primary'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/pengaturan-warna-halaman').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setColorPrimary(data)
    }
  }, [data])

  return { colorPrimary, loading }
}
