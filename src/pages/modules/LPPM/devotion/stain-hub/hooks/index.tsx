import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDevotionHub } from './types'

export const UseGetMainDevotion = () => {
  const [responseData, setResponseData] = useState<IDevotionHub>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['hub-devotion'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/stain-hub').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
