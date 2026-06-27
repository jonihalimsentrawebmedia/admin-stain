import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPromotion } from '@/pages/modules/website-prodi/public-content/promotion/data/types.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useSearchParams } from 'react-router-dom'

interface IPromotionResponse {
  data: IPromotion[]
  meta: Meta
}

interface ILogPromotion {
  id: string
  [key: string]: unknown
}

export const UseGetPromotionProdi = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery<IPromotionResponse>({
    queryKey: ['promotion-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/promosi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { promotion: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetPromotionProdiDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IPromotion>({
    queryKey: ['promotion-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/promosi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { promotionDetail: data, loading }
}

export const UseGetPromotionProdiStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['promotion-prodi-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/promosi/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogPromotionProdi = (id: string) => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: ILogPromotion[]; meta: Meta }>({
    queryKey: ['log-promosi', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/promosi-log/${id}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { logData: data?.data ?? [], loading, meta: data?.meta }
}
