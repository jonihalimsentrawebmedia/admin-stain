import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IHKIRegistration } from './types'

export const UseGetBookPublisher = () => {
  const [responseData, setResponseData] = useState<IHKIRegistration>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['hki-registration'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pendaftaran-kl').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
