import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPromotion } from '@/pages/modules/website-prodi/public-content/promotion/data/types.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useSearchParams } from 'react-router-dom'

export const UseGetPromotionProdi = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const [promotion, setPromotion] = useState<IPromotion[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['promotion-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/promosi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPromotion(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { promotion, loading, meta }
}

export const UseGetPromotionProdiDetail = (id: string) => {
  const [promotionDetail, setPromotionDetail] = useState<IPromotion>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['promotion-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/promosi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPromotionDetail(data)
    }
  }, [data])

  return { promotionDetail, loading }
}

export const UseGetPromotionProdiStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['promotion-prodi-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/promosi/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogPromotionProdi = (id: string) => {
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
      AxiosClient.get(`/prodi/promosi-log/${id}?${ParamsSearch}`).then((res) => res.data),
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
