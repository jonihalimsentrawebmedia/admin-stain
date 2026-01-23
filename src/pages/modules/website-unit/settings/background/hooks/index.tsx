import { useEffect, useState } from 'react'
import type { IUnitBackground } from '../data/index'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page: string
  limit: string
  context?: string
}

export const UseGetUnitBackground = (props?: Props) => {
  const { page, limit, context } = props ?? {}

  const [unitBackground, setUnitBackground] = useState<IUnitBackground[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-background', ParamsSearch.toString(), context],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/unit-background/${context}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitBackground(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { unitBackground, loading, meta }
}
