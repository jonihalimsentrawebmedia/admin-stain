import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminPMB = (context: 'admin' | 'public') => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-${context}-pmb`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pmb/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}

export const UseGetAdminThemePMB = () => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`pmb-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pmb/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
