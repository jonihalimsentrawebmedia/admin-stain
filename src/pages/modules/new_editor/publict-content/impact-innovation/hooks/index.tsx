import { useEffect, useState } from 'react'
import type { IImpactInnovationList } from '@/pages/modules/new_editor/publict-content/impact-innovation/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetImpactInnovationDetail = (id: string) => {
  const [detailImpactInnovation, setDetailImpactInnovation] = useState<IImpactInnovationList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-impact-innovation-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/inovasi-berdampak/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailImpactInnovation(data)
    }
  }, [data])

  return { detailImpactInnovation, loading }
}

export const UseGetLogImpactInnovation = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-inovasi-berdampak-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/inovasi-berdampak-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
