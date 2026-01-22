import { useEffect, useState } from 'react'
import type { IUnitMainService } from '@/pages/modules/website-unit/services/main/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetMainListService = () => {
  const [mainService, setMainService] = useState<IUnitMainService[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['main-service'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/layanan-utama').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMainService(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { mainService, loading, meta }
}
