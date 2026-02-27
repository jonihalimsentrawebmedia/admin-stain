import { useEffect, useState } from 'react'
import type { IListDRPM } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListDRTPM = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}
  const [response, setResponse] = useState<IListDRPM[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-drtpm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/drtpm?${ParamsSearch}`).then((res) => res.data),
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

export const UseGetDetailDRTPM = (id: string) => {
  const [detail, setDetail] = useState<IListDRPM>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-drtpm', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/drtpm/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
