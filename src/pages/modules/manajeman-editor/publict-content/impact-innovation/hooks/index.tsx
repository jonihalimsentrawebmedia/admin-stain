import type { IImpactInnovationList } from '@/pages/modules/manajeman-editor/publict-content/impact-innovation/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetImpactInnovationDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IImpactInnovationList>({
    queryKey: ['detail-impact-innovation-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/inovasi-berdampak/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailImpactInnovation: data, loading }
}

export const UseGetLogImpactInnovation = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-inovasi-berdampak-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/inovasi-berdampak-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
