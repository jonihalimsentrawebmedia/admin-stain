import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICategoryDownload, IDownload } from '../types/index.tsx'

interface Props {
  isGetAll?: boolean
}

export const UseGetCategoryDownload = (props?: Props) => {
  const { isGetAll } = props || {}

  const [categoryDownload, setCategoryDownload] = useState<ICategoryDownload[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  let ParamsSearch: URLSearchParams

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '9999' })
    if (search) ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit })
    if (search) ParamsSearch.append('search', search)
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['category-download', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-berkas?${ParamsSearch}`).then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setCategoryDownload(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { categoryDownload, loading, meta }
}

export const UseGetDownload = () => {
  const [download, setDownload] = useState<IDownload[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (category) ParamsSearch.append('id_kategori_berkas', category)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-download', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/downloads?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDownload(data)
      setMeta(data?.meta)
    }
  }, [data])

  return { download, loading, meta }
}

export const UseGetDownloadDetail = (id: string) => {
  const [detailDownload, setDetailDownload] = useState<IDownload>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-download', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/downloads/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailDownload(data)
    }
  }, [data])

  return { detailDownload, loading }
}
