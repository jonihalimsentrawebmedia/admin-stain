import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { VisiMisiUnitList } from '../model'

const useGetVisiMisiUnitDetail = () => {
  const params = useParams()
  const { id } = params
  const [visiMisi, setVisiMisi] = useState<VisiMisiUnitList>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/visi-misi/${id}`).then((res) => res.data.data),
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

export default useGetVisiMisiUnitDetail
