import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainResearch } from './types'

export const UseGetMainResearch = () => {
  const [responseData, setResponseData] = useState<IMainResearch>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['main-research'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pusat-penelitian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
