import { useEffect, useState } from 'react'
import type { IThemePMB } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-lembaga/pengaturan/template/model'

export const UseGetTemplatePMB = () => {
  const [template, setTemplate] = useState<IThemePMB[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-pmb'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pmb/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplate(data)
    }
  }, [data])

  return { template, loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const [detail, setDetail] = useState<ThemeColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
