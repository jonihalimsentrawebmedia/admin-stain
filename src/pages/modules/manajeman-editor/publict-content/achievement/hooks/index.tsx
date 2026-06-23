import type { IAchievementDetail } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAchievementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAchievementDetail>({
    queryKey: ['detail-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailAchievement: data, loading }
}

export const UseGetLogAchievement = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
