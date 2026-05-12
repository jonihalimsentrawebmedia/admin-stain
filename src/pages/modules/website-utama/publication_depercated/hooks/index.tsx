// website-utama/tahun-publikasi

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IYearPublication } from '@/pages/modules/website-utama/publication_depercated/data/types.ts'

export const UseGetYearPublication = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const [year, setYear] = useState<IYearPublication[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['publication-year', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-publikasi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, year }
}
