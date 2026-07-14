import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IStatusInapCount {
  DIRAWAT: number
  MENUNGGU_RUANGAN: number
  PULANG: number
}

export const UseGetRegistrationStatusInapCount = () => {
  const { data, isLoading, isFetching } = useQuery<IStatusInapCount>({
    queryKey: ['registration-status-inap-count'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/pelayanan/pendaftaran/status-inap/count').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { statusInapCount: data, loading }
}
