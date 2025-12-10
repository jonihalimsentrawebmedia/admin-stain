import { useQuery } from '@tanstack/react-query'
import type {  ServicesListDetail } from '../model'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetServicesDetail = () => {
  const [service, setService] = useState<ServicesListDetail>()
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-services'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/layanan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setService(data?.data ?? [])
    }
  }, [data])

  return { service, loading }
}

export default useGetServicesDetail
