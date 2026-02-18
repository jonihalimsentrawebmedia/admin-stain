import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { ServiceCommitmentList } from '../model'

const useGetServiceCommitmentDetail = () => {
  const params = useParams()
  const { id } = params
  const [serviceCommitment, setServiceCommitment] = useState<ServiceCommitmentList>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['service-commitment-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/maklumat-layanan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceCommitment(data)
    }
  }, [data])

  return {
    serviceCommitment,
    loading,id
  }
}

export default useGetServiceCommitmentDetail
