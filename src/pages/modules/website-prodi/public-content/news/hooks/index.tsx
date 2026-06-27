import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

interface INewsResponse {
  data: INewsDetail[]
  meta: Meta
}

interface ILogNews {
  id: string
  [key: string]: unknown
}

export const UseGetProdiNews = (props?: IPropsData) => {
  const { page, limit, status_publish, year } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<INewsResponse>({
    queryKey: ['prodi-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { prodiNews: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetProdiNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['prodi-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { prodiNewsDetail: data, loading }
}

export const UseGetProdiNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['prodi-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNewsProdi = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogNews[]>({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['news-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/berita/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
