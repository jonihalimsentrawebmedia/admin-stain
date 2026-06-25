import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '../data/types'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetFacultyNews = (props?: IPropsData) => {
  const { page, limit, status_publish, search, year } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<{ data: INewsDetail[]; meta: Meta }>({
    queryKey: ['faculty-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  const unitNews = data?.data ?? []
  const meta = data?.meta

  return { unitNews, loading, meta }
}

export const UseGetFacultyNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['faculty-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitNewsDetail: data, loading }
}

export const UseGetFacultyNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['faculty-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNewsFaculty = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-faculty-news', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['news-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/berita/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
