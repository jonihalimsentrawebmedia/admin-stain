import { useParams } from 'react-router-dom'
import type { VisiMisiLembagaList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetVisiMisiLembagaDetail = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery<VisiMisiLembagaList>({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-lembaga-detail', id],
    queryFn: () => AxiosClient.get(`/lembaga/visi-misi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    visiMisi: data,
    loading,
  }
}

export default useGetVisiMisiLembagaDetail
