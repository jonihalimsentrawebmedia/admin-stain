import { useEffect, useState } from 'react'
import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-lembaga/pengaturan/template/model'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetTemplateSPI = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [template, setTemplate] = useState<IThemeUnit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/thema?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplate(data?.data)
      setMeta(data.meta)
    }
  }, [data])

  return { template, loading, meta }
}

export const UseGetTemplateDetail = (slug: string) => {
  const [detail, setDetail] = useState<ThemeColor>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
