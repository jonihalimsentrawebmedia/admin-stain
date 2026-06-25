import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetWorkResponsibilitiesDetail = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['work-responsibilities-detail', id],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/tugas-fungsi-tanggung-jawab/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    workResponsibilities: data,
    loading,
  }
}

export default useGetWorkResponsibilitiesDetail
