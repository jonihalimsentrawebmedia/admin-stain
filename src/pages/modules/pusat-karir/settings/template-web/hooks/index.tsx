import { useEffect, useState } from 'react'
import type { IThemeUnit, ThemeColor } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateUnit = () => {
  const [templateUnit, setTemplateUnit] = useState<IThemeUnit[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateUnit(data)
    }
  }, [data])

  return { templateUnit, loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const [detail, setDetail] = useState<ThemeColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
