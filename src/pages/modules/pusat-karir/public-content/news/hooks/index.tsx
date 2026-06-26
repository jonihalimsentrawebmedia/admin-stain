import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '../data/types'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetCarrierNews = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: INewsDetail[]; meta: Meta }>({
    queryKey: ['carrier-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { unitNews: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetCarrierNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['carrier-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitNewsDetail: data, loading }
}

export const UseGetCarrierNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['carrier-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNewsCarrier = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-carrier-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['year-news'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/berita/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
