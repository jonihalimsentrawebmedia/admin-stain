import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { VisiMisiUnitList } from '../model'

const useGetVisiMisiUnitDetail = () => {
  const params = useParams()
  const { id } = params

  const { data, isLoading, isFetching } = useQuery<VisiMisiUnitList>({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/visi-misi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return {
    visiMisi: data,
    loading,
  }
}

export default useGetVisiMisiUnitDetail
