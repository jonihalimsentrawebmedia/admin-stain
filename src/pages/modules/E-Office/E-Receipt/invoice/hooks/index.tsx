import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IReconciliation } from '@/pages/modules/E-Office/E-Receipt/invoice/data/types.ts'

export const UseGetReconciliation = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IReconciliation>({
    queryKey: ['reconciliation'],
    queryFn: () =>
      AxiosClient.get(`/eoffice/kwitansi/${id}/reconciliation`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { loading, reconciliation: data }
}
