import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISectorStudy } from '../data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListSectorStudy = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [sectorStudy, setSectorStudy] = useState<ISectorStudy[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.set('search', search ?? '')
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['sector-work', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/detail-sektor-pendidikan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSectorStudy(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { sectorStudy, loading, meta }
}
