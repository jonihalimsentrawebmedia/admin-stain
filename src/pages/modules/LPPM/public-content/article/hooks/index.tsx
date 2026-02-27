import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useSearchParams } from 'react-router-dom'
import type { IArtikel } from '../data/types'

export const UseGetArticleLppm = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const [article, setArticle] = useState<IArtikel[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['article-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/artikel?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setArticle(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { article, loading, meta }
}

export const UseGetArticleLppmDetail = (id: string) => {
  const [articleDetail, setArticleDetail] = useState<IArtikel>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['article-lppm-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/artikel/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setArticleDetail(data)
    }
  }, [data])

  return { articleDetail, loading }
}

export const UseGetArticleLppmStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['article-lppm-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/artikel/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogArticleLppm = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-promosi', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/artikel-log/${id}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { logData, loading, meta }
}
