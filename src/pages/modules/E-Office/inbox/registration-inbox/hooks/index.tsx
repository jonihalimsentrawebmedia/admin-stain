import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInbox } from '@/pages/modules/E-Office/inbox/registration-inbox/data/types.ts'

export const UseGetDetailInbox = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IInbox>({
    queryKey: ['detail-inbox', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-masuk/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, detailInbox: data }
}
