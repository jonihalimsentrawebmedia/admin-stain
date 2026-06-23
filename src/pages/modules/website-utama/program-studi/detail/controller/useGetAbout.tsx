import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetAbout = () => {
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-about'],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/tentang`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { aboutDetail: data?.data, loading }
}

export default useGetAbout