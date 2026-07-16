import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IColorSIMRS {
  warna_primary: string
}

export const UseGetColorSIMRS = () => {
  const { data, isLoading, isFetching } = useQuery<IColorSIMRS>({
    queryKey: ['color-simrs'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/pengaturan/warna').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { color: data, loading }
}
