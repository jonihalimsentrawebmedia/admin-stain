import { useEffect, useState } from 'react'
import type {
  ICategoryDownload,
  IDownload,
} from '@/pages/modules/website-utama/public-content/download/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  isGetAll?: boolean
}

export const UseGetCategoryDownloadUnit = (props?: Props) => {
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
    queryKey: ['category-download-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/kategori-berkas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCategoryDownload(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { categoryDownload, loading, meta }
}

export const UseGetDownloadUnit = () => {
  const [downloadUnit, setDownloadUnit] = useState<IDownload[]>([])
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
    queryKey: ['download-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/downloads?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDownloadUnit(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { downloadUnit, loading, meta }
}

export const UseGetDownloadUnitDetail = (id: string) => {
  const [downloadProdiDetail, setDownloadProdiDetail] = useState<IDownload>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['download-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/downloads/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDownloadProdiDetail(data)
    }
  }, [data])

  return { downloadProdiDetail, loading }
}