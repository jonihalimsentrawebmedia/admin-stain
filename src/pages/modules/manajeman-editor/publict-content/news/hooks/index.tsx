import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetManagementEditorNewsDetail = (id: string) => {
  const [managementEditorNewsDetail, setManagementEditorNewsDetail] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setManagementEditorNewsDetail(data)
    }
  }, [data])

  return { managementEditorNewsDetail, loading }
}

export const UseGetLogNewsManagementEditor = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/berita-log/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])
  
  return { logData, loading }
}