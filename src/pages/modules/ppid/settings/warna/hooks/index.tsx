import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdmin = (context: 'admin' | 'public') => {

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`color-${context}`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/unit-ppid/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}

export const UseGetAdminThemeUUID = () => {

  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-theme-unit-ppid`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/unit-ppid/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
