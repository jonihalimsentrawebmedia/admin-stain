import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'

export const UseGetEntrance = (props: BasicProps) => {
  const { page, limit, search } = props
  const [entrance, setEntrance] = useState<IEntrance[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('page', page ?? '1')
  ParamsSearch.append('limit', limit ?? '10')
  ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['entrance-pmb', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/jalur-masuk?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEntrance(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { entrance, loading, meta }
}

export const UseGetEntranceDetail = (id: string) => {
  const [entrance, setEntrance] = useState<IEntrance>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['entrance-pmb-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/jalur-masuk/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEntrance(data)
    }
  }, [data])

  return { entrance, loading }
}
