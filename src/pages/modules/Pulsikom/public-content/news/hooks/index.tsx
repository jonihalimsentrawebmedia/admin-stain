import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '../data/types'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetCarrierNews = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const [unitNews, setUnitNews] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitNews(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { unitNews, loading, meta }
}

export const UseGetCarrierNewsDetail = (id: string) => {
  const [unitNewsDetail, setUnitNewsDetail] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitNewsDetail(data)
    }
  }, [data])

  return { unitNewsDetail, loading }
}

export const UseGetCarrierNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogNewsCarrier = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pusilkom-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
