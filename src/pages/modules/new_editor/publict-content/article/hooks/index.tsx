import { useEffect, useState } from 'react'
import type { IArticle,} from '../data/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetArticleManagementEditorDetail = (id: string) => {
  const [articleDetail, setArticleDetail] = useState<IArticle>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['article-detail-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/artikel/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setArticleDetail(data)
    }
  }, [data])

  return { articleDetail, loading }
}

export const UseGetLogArticleEditor = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-artikel-editor', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/artikel-log/${id}?${ParamsSearch}`).then((res) => res.data),
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
