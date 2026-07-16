import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ICodeSIMRS {
  kode: string
  jumlah_digit: number
}

export const UseGetCodeSIMRS = () => {
  const { data, isLoading, isFetching } = useQuery<ICodeSIMRS>({
    queryKey: ['code-simrs'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/pengaturan/kode-rekam-medis').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { code: data, loading }
}
