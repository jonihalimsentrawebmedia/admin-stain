import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdmin = (context: 'admin' | 'public') => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-${context}-lppm`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/lppm/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}

export const UseGetAdminThemeUUID = () => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`lppm-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
