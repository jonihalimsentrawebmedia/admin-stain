import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '../data/types'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
interface ILogNews {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetUnitNews = (props?: IPropsData) => {
  const { page, limit, status_publish, search, year } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search ?? '')
  if (year) ParamsSearch.append('year', year ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: INewsDetail[]; meta: Meta }>({
    queryKey: ['unit-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { unitNews: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetUnitNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['unit-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitNewsDetail: data, loading }
}

export const UseGetUnitNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['unit-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNewsUnit = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogNews[]>({
    queryKey: ['log-unit-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['news-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/berita/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
