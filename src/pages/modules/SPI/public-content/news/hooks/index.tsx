import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '../data/types'
import type { IApiResponse } from '@/utils/globalType.ts'

export const UseGetNews = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IApiResponse<INewsDetail[]>>({
    queryKey: ['spi-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const unitNews: INewsDetail[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { unitNews, loading, meta }
}

export const UseGetNewsDetail = (id: string) => {
  const { data: unitNewsDetail, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['spi-news-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitNewsDetail, loading }
}

export const UseGetNewsStatus = () => {
  const { data: status, isLoading, isFetching } = useQuery<Record<string, number>>({
    queryKey: ['spi-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status, loading }
}

export const UseGetLogNews = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<unknown[]>({
    queryKey: ['log-spi-berita', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/berita-log/${id}`).then((res) => res.data.data),
  })

  const logData: unknown[] = data ?? []
  const loading = isLoading || isFetching

  return { logData, loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['news-spi-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/berita/tahun').then((res) => res.data?.data),
  })

  const year: number[] = data ?? []
  const loading = isLoading || isFetching

  return { year, loading }
}
