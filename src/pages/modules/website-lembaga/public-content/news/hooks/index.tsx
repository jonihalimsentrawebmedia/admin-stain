import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-lembaga/public-content/news/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'

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

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const status = searchParams.get('status')
  const category = searchParams.get('id_category')
  const search = searchParams.get('search')
  const year = searchParams.get('year') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (status) ParamsSearch.append('status-publish', status)
  if (category) ParamsSearch.append('id-kategori-berita', category)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-news-lembaga', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita?${ParamsSearch}`).then((res) => res.data),
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

export const UseGetNewsDetail = (id: string) => {
  const [detailNews, setDetailNews] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-news-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailNews(data)
    }
  }, [data])

  return { detailNews, loading }
}

export const UseGetNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-news-lembaga'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/berita/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogNews = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-berita-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetNewsYear = () => {
  const [year, setYear] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-news-lembaga-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data)
    }
  }, [data])

  return { year, loading }
}
