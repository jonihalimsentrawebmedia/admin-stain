import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBookPublisher } from './types'

export const UseGetBookPublisher = () => {
  const [responseData, setResponseData] = useState<IBookPublisher>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['book-publisher'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/penerbitan-buku').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
