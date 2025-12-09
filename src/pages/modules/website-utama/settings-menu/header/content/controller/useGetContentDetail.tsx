import  { useEffect, useState } from 'react'
import type { ContentList } from '../model'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'

const useGetContentDetail = () => {
  const [contentList, setContentList] = useState<ContentList>()
  const params = useParams()
  const { idContent} = params

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-contents-detail'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/konten/${idContent}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContentList(data?.data ?? [])
      
    }
  }, [data])

  return { contentList, loading, }
}

export default useGetContentDetail
