import { useEffect, useState } from 'react'
import type { IOtherFunding } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetOtherFunding = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}
  const [response, setResponse] = useState<IOtherFunding[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['other-funding', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/pendanaan-lainnya?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponse(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { response, loading, meta }
}

export const UseGetDetailOtherFunding = (id: string) => {
  const [detail, setDetail] = useState<IOtherFunding>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['other-funding-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/pendanaan-lainnya/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
