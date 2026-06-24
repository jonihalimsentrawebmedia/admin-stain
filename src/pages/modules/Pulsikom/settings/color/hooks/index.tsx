import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IColor {
  warna_sekunder: string
  warna_primer: string
}

export const UseGetColorAdminPulsikom = (context: 'admin' | 'public') => {
  const { data, isLoading, isFetching } = useQuery<IColor>({
    queryKey: [`color-${context}-pusilkom`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusilkom/pengaturan-warna/${context}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
