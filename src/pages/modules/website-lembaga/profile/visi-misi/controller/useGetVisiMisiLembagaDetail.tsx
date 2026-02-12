import { useParams } from 'react-router-dom'
import type { VisiMisiLembagaList } from '../model'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetVisiMisiLembagaDetail = () => {
  const params = useParams()
  const { id } = params
  const [visiMisi, setVisiMisi] = useState<VisiMisiLembagaList>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-lembaga-detail', id],
    queryFn: () => AxiosClient.get(`/lembaga/visi-misi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisiMisi(data)
    }
  }, [data])

  return {
    visiMisi,
    loading,
  }
}

export default useGetVisiMisiLembagaDetail
