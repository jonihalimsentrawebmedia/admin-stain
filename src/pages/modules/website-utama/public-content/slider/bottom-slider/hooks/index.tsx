import { useEffect, useState } from 'react'
import type { IListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface ISatusSlider {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}

export const UseGetListBottomSlider = () => {
  const [listBottomSlider, setListBottomSlider] = useState<IListBottomSlider[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const statusPublish = searchParams.get('status')
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const ParamSearch = new URLSearchParams({ page, limit })
  if (statusPublish) ParamSearch.append('status-publish', statusPublish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-slider-bottom', ParamSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/slider-bawah?${ParamSearch}`).then((res) => res.data),
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
    queryKey: ['detail-slider-bottom', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/slider-bawah/${id}`).then((res) => res.data.data),
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
    queryKey: ['status-slider-bottom'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/slider-bawah/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}
