import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetProdiNews = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const [prodiNews, setProdiNews] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiNews(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { prodiNews, loading, meta }
}

export const UseGetProdiNewsDetail = (id: string) => {
  const [prodiNewsDetail, setProdiNewsDetail] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiNewsDetail(data)
    }
  }, [data])

  return { prodiNewsDetail, loading }
}

export const UseGetProdiNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogNewsProdi = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita-log/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])
  
  return { logData, loading }
}