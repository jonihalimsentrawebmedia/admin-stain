import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import type { INewsDetail } from '../data'

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
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const status = searchParams.get('status')
  const category = searchParams.get('id_category')
  const search = searchParams.get('search') ?? ''
  const year = searchParams.get('year') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (status) ParamsSearch.append('status-publish', status)
  if (category) ParamsSearch.append('id-kategori-berita', category)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<{
    data: INewsDetail[]
    meta: Meta
  }>({
    queryKey: ['list-news-unit-ppid', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { newsList: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['detail-news-unit-ppid', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/berita/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailNews: data, loading }
}

export const UseGetNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['status-news-unit-ppid'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit-ppid/berita/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNews = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-berita-unit-ppid', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['year-news-unit-ppid'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit-ppid/berita/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
