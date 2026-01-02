import  { useEffect, useState } from 'react'
import type { About } from '../model/about'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetAbout = () => {
const [aboutDetail, setAboutDetail] =
    useState<About>()
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-about'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/tentang`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAboutDetail(data?.data)
    }
  }, [data])

  return { aboutDetail, loading }
}

export default useGetAbout