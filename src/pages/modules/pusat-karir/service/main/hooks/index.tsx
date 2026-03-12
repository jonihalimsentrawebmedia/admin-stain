import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainService } from '@/pages/modules/pusat-karir/service/main/data/types.ts'

export const UseGetMainService = () => {
  const [mainService, setMainService] = useState<IMainService[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['main-service'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/layanan-utama').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMainService(data)
    }
  }, [data])

  return { mainService, loading }
}
