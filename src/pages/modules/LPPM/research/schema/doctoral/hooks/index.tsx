import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainResearch } from './types'

export const UseGetSchemaDoctoralResearch = () => {
  const [responseData, setResponseData] = useState<IMainResearch>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['doctoral-research'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/post-program-doktoral').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return { responseData, loading }
}
