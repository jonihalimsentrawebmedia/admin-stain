import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IOutbox } from '../data/types.ts'

export const UseGetDetailOutbox = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IOutbox>({
    queryKey: ['detail-outbox', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-keluar/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, detailOutbox: data }
}
