import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetAcreditationDetail = () => {
  const { idAcreditation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['acreditation-detail'],
    refetchOnWindowFocus: false,
    enabled: !!idAcreditation,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas/${idAcreditation}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { acreditationDetail: data?.data, loading }
}

export default useGetAcreditationDetail
