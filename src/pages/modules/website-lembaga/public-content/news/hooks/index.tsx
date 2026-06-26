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

interface INewsListResponse {
  data: INewsDetail[]
  meta: Meta
}

export const UseGetNews = () => {
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

  const { data, isLoading, isFetching } = useQuery<INewsListResponse>({
    queryKey: ['list-news-lembaga', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { newsList: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['detail-news-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailNews: data, loading }
}

export const UseGetNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['status-news-lembaga'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/berita/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export interface ILogNews {
  id: string
  aktivitas: string
  created_at: string
  created_user: string
  nama_user: string
}

export const UseGetLogNews = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogNews[]>({
    queryKey: ['log-berita-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['list-news-lembaga-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/berita/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
