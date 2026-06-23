import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetFieldOfCooperationDetail = () => {
  const { idFieldOfCooperation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['field-of-cooperation-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idFieldOfCooperation,
    queryFn: () =>
      AxiosClient.get(`/website-utama/bidang-kerjasama/${idFieldOfCooperation}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { fieldOfCooperationDetail: data?.data, loading }
}

export default useGetFieldOfCooperationDetail
