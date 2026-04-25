import { useEffect, useState } from 'react'
import type { IAchievementDetail } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAchievementDetail = (id: string) => {
  const [detailAchievement, setDetailAchievement] = useState<IAchievementDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailAchievement(data)
    }
  }, [data])

  return { detailAchievement, loading }
}

export const UseGetLogAchievement = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-achievement-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/prestasi-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
