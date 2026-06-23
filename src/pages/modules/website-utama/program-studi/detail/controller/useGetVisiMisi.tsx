import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'

const useGetVisiMisi = () => {
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-visi-misi'],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/visi-misi`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { visiMisiDetail: data?.data, loading }
}

export default useGetVisiMisi