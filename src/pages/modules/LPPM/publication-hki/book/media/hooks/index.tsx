import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMediaBook } from './types'

export const UseGetBookPublisher = () => {
  const [responseData, setResponseData] = useState<IMediaBook>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['book-media'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/penerbitan-media-masa').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
