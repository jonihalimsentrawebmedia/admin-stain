import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPrescriptionStatusCount, IResepItem, IDetailPrescription } from '../data/types.ts'

export interface PrescriptionProps {
  page?: string
  limit?: string
  search?: string
  status_resep?: string
}

export const UseGetPrescriptionStatusCount = () => {
  const { data, isLoading, isFetching } = useQuery<IPrescriptionStatusCount>({
    queryKey: ['prescription-status-count'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/farmasi/resep/status-count').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { statusCount: data, loading }
}

export const UseGetPrescription = (props?: PrescriptionProps) => {
  const { page, search, limit, status_resep } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (status_resep) ParamsSearch.append('status_resep', status_resep ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IResepItem[]; meta: Meta }>({
    queryKey: ['prescription', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/farmasi/resep?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { prescription: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailPrescription = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailPrescription>({
    queryKey: ['detail-prescription', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/farmasi/resep/${id}`).then((res) => res.data?.data),
    enabled: !!id,
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
