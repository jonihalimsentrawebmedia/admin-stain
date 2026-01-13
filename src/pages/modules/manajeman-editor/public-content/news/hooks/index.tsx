import { useEffect, useState } from 'react'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetManagementEditorNews = (props?: IPropsData) => {
  const { page, limit, status_publish, id_satuan_organisasi, id_kategori_berita } = props ?? {}

  const [managementEditorNews, setMangementEditorNews] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (id_satuan_organisasi) ParamsSearch.append('id-satuan-organisasi', id_satuan_organisasi)
  if (id_kategori_berita) ParamsSearch.append('id-kategori-berita', id_kategori_berita)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-news', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/berita?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMangementEditorNews(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { managementEditorNews, loading, meta }
}

export const UseGetManagementEditorNewsDetail = (id: string) => {
  const [managementEditorNewsDetail, setManagementEditorNewsDetail] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-news-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/berita/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setManagementEditorNewsDetail(data)
    }
  }, [data])

  return { managementEditorNewsDetail, loading }
}

export const UseGetManagementEditorNewsStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-news-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/berita/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogNewsManagementEditor = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-berita', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/berita-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
