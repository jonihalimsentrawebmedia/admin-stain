import { useEffect, useState } from 'react'
import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props {
  page?: string
  limit?: string
  search?: string
}

export const UseGetHistoryUnit = (props?: props) => {
  const { page, limit, search } = props ?? {}
  const [historyUnit, setHistoryUnit] = useState<IHistoryUnit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page)
  if (limit) ParamsSearch.append('limit', limit)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['history-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/sejarah?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHistoryUnit(data.data)
      setMeta(data.meta)
    }
  }, [data])
  return { historyUnit, loading, meta }
}
