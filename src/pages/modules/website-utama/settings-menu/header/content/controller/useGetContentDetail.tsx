import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetContentDetail = () => {
  const params = useParams()
  const { idContent} = params

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-contents-detail', idContent],
    refetchOnWindowFocus: false,
    enabled: !!idContent,
    queryFn: () => AxiosClient.get(`/website-utama/konten/${idContent}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { contentList: data?.data ?? [], loading }
}

export default useGetContentDetail
