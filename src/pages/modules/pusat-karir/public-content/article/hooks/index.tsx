import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IArticleCarrier, IPropsData } from '../data/types'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetCarrierArticle = (props?: IPropsData) => {
  const { page, limit, status_publish, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: IArticleCarrier[]; meta: Meta }>({
    queryKey: ['carrier-article', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/artikel?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { article: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetCarrierArticleDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IArticleCarrier>({
    queryKey: ['carrier-article-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/artikel/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitNewsDetail: data, loading }
}

export const UseGetCarrierArticleStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['carrier-article-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/artikel/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogArticleCarrier = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-carrier-article', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/artikel-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
