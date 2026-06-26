import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useSearchParams } from 'react-router-dom'
import type { IArtikel } from '../data/types'

interface IArticleResponse {
  data: IArtikel[]
  meta: Meta
}

interface ILogArticleResponse {
  data: any[]
  meta: Meta
}

export const UseGetArticleLppm = (props?: IPropsData) => {
  const { page, limit, status_publish, search } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IArticleResponse>({
    queryKey: ['article-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/artikel?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { article: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetArticleLppmDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IArtikel>({
    queryKey: ['article-lppm-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/artikel/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { articleDetail: data, loading }
}

export const UseGetArticleLppmStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['article-lppm-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/artikel/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogArticleLppm = (id: string) => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<ILogArticleResponse>({
    queryKey: ['log-promosi', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/artikel-log/${id}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { logData: data?.data ?? [], loading, meta: data?.meta }
}
