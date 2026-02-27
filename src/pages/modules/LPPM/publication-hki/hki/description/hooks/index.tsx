import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IHKIDescription } from './types'

export const UseGetBookPublisher = () => {
  const [responseData, setResponseData] = useState<IHKIDescription>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['hki-description'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/deskripsi-kl').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
