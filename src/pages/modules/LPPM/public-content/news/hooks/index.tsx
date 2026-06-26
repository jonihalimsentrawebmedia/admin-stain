import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

interface ILppmNewsResponse {
  data: INewsDetail[]
  meta: Meta
}

export const UseGetLPPMNews = (props?: IPropsData) => {
  const { page, limit, status_publish, search, year } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search ?? '')
  if (year) ParamsSearch.append('tahun', year ?? '')

  const { data, isLoading, isFetching } = useQuery<ILppmNewsResponse>({
    queryKey: ['lppm-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { lppmNews: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetLppmNewsDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INewsDetail>({
    queryKey: ['lppm-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { lppmNewsDetail: data, loading }
}

export const UseGetLppmNewsStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['lppm-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogNewsLppm = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetNewsYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['news-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/berita/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
