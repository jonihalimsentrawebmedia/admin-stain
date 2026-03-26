import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISectorStudy } from '../data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetListSectorStudy = () => {
  const [sectorStudy, setSectorStudy] = useState<ISectorStudy[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['sector-work'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/detail-sektor-pendidikan').then((res) => res.data),
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
