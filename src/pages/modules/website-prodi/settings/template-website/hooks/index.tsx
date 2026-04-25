import { useEffect, useState } from 'react'
import type { IThemeProdi, ThemeColor } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetTemplateProdi = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [templateProdi, setTemplateProdi] = useState<IThemeProdi[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/thema?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateProdi(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { templateProdi, loading, meta }
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
