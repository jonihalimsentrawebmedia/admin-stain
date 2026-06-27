import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColorPrimary {
  warna_halaman_utama: string
  warna_background_footer: string
  warna_admin: string
}

export const UseGetUnitPrimary = () => {
  const { data, isLoading, isFetching } = useQuery<IColorPrimary>({
    queryKey: ['unit-primary'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/pengaturan-warna-halaman').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { colorPrimary: data, loading }
}
