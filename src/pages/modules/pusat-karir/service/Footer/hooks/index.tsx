// footer-service

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainService } from '@/pages/modules/pusat-karir/service/main/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetFooterService = () => {
  const [service, setService] = useState<IMainService[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['footer-service'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/layanan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setService(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { service, loading, meta }
}
