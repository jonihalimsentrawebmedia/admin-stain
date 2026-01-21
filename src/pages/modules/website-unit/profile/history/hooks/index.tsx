import { useEffect, useState } from 'react'
import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetHistoryUnit = () => {
  const [historyUnit, setHistoryUnit] = useState<IHistoryUnit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['history-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/sejarah').then((res) => res.data),
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
