import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetLPPMNews = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const [lppmNews, setLppmNews] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lppm-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLppmNews(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { lppmNews, loading, meta }
}

export const UseGetLppmNewsDetail = (id: string) => {
  const [lppmNewsDetail, setLppmNewsDetail] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lppm-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLppmNewsDetail(data)
    }
  }, [data])

  return { lppmNewsDetail, loading }
}

export const UseGetLppmNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lppm-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogNewsLppm = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita-log/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])
  
  return { logData, loading }
}