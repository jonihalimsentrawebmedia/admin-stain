import { useEffect, useState } from 'react'
import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetTemplateUnit = (props: basicProps) => {
  const { page, limit, search } = props

  const [templateUnit, setTemplateUnit] = useState<IThemeUnit[]>([])

  const Params = new URLSearchParams()
  if (page) Params.set('page', page??'1')
  if (limit) Params.set('page', limit??'10')
  if (search) Params.set('search', page??'')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/thema').then((res) => res.data.data),
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
    queryFn: () => AxiosClient.get(`/unit/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
