import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetServiceCommitmentDetail = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['service-commitment-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/maklumat-layanan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    serviceCommitment: data,
    loading,
    id,
  }
}

export default useGetServiceCommitmentDetail
