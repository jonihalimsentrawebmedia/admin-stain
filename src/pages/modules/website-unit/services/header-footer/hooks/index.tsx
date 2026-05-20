import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IUnitHeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetHeaderFooterService = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [serviceHeaderFooter, setServiceHeaderFooter] = useState<IUnitHeaderFooterServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (search) params.append('search', search ?? '')
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['header-footer', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/layanan-header-footer?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceHeaderFooter(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { serviceHeaderFooter, loading, meta }
}
