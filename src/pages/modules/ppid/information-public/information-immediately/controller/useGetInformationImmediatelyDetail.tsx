import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetInformationImmediatelyDetail = () => {
  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['information-immediately-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/informasi-serta-merta-informasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    informationImmediately: data,
    loading,
    id,
  }
}

export default useGetInformationImmediatelyDetail
