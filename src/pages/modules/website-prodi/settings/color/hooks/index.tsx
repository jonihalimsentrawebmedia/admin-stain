import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IColorPrimary {
  warna_halaman_utama: string
  warna_background_footer: string
  warna_admin: string
}

export const UseGetProdiPrimary = () => {
  const { data, isLoading, isFetching } = useQuery<IColorPrimary>({
    queryKey: ['prodi-primary'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/pengaturan-warna-halaman').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { colorPrimary: data, loading }
}
