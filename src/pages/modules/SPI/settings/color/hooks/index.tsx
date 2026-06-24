import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminSPI = (context: 'admin' | 'public') => {
  const { data: color, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-${context}-spi`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/spi/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color, loading }
}

export const UseGetAdminThemeSPI = () => {
  const { data: color, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`spi-pengaturan-warna-admin`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/spi/pengaturan-warna/admin`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color, loading }
}
