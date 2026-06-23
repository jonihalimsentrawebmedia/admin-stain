import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetContactUs = () => {
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-contact-us'],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/hubungi-kami`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { contactUsDetail: data?.data, loading }
}

export default useGetContactUs