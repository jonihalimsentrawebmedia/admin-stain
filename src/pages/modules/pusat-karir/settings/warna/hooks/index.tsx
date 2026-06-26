import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminCarrier = (context: 'admin' | 'public') => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-${context}-carrier`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusat-karir/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}

export const UseGetAdminThemeCarrier = () => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`carrier-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusat-karir/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
