import { useEffect, useState } from 'react'
import type { IThemeProdi, ThemeColor } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateProdi = () => {
  const [templateProdi, setTemplateProdi] = useState<IThemeProdi[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateProdi(data)
    }
  }, [data])

  return { templateProdi, loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const [detail, setDetail] = useState<ThemeColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
