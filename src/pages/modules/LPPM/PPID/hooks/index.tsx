import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {IInformationPPID} from './types'

export const UseGetInformationPPID = () => {
  const [responseData, setResponseData] = useState<IInformationPPID>()

  const {data, isFetching, isLoading} = useQuery({
    queryKey: ['ppid-information'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/lppm/ppid').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResponseData(data)
    }
  }, [data])

  return {responseData, loading}
}
