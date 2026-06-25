import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetServicesDetail = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-services-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/website-utama/layanan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { service: data?.data ?? [], loading }
}

export default useGetServicesDetail
