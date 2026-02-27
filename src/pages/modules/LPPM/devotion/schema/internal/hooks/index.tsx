import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainDevotion } from './types'

export const UseGetSchemaDevotion = () => {
  const [responseData, setResponseData] = useState<IMainDevotion>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['schema-devotion'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/lppm/pengabdian-pendanaan-internal').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
