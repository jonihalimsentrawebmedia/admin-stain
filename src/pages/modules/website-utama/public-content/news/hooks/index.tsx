import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface INewsStatus {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}

export const UseGetNews = () => {
  const [newsList, setNewsList] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['nes'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/berita').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNewsList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { newsList, loading, meta }
}

export const UseGetNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-news'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/berita/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}
