import  { useEffect, useState } from 'react'
import type { VisiMisiList } from '../model/visi-misi'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'

const useGetVisiMisi = () => {
const [visiMisiDetail, setVisiMisiDetail] =
    useState<VisiMisiList>()
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-visi-misi'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/visi-misi`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisiMisiDetail(data?.data)
    }
  }, [data])

  return { visiMisiDetail, loading }
}

export default useGetVisiMisi