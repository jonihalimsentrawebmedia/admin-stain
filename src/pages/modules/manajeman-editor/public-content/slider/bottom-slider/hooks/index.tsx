import { useEffect, useState } from 'react'
import type { IListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types'

export interface ISatusSlider {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}

export const UseGetListBottomSlider = (props: IPropsData) => {
  const { page, limit, status_publish, id_satuan_organisasi } = props

  const [listBottomSlider, setListBottomSlider] = useState<IListBottomSlider[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()

  const search = searchParams.get('search') ?? ''

  const ParamSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10', search })
  if (status_publish) ParamSearch.append('status-publish', status_publish)
  if (id_satuan_organisasi) ParamSearch.append('id-satuan-organisasi', id_satuan_organisasi)
  if (search) ParamSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-slider-bottom-editor', ParamSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-bawah?${ParamSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListBottomSlider(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listBottomSlider, loading, meta }
}

export const UseGetBottomSliderDetail = (id: string) => {
  const [detailSlider, setDetailSlider] = useState<IListBottomSlider>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-slider-bottom-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-bawah/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailSlider(data)
    }
  }, [data])

  return { detailSlider, loading }
}

export const UseGetStatusBottomSlider = () => {
  const [status, setStatus] = useState<ISatusSlider>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-slider-bottom-editor'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/slider-bawah/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetBottomSlider = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-slider-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-bawah-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
