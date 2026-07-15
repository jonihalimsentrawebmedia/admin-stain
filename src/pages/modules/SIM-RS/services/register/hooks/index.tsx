import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRegistration, IStatusCount } from '../data/types.ts'

export interface RegistrationProps {
  page?: string
  limit?: string
  search?: string
  status?: string
  is_inap?: string
  status_rawat_inap?: string
}

export const UseGetRegistrationStatusCount = () => {
  const { data, isLoading, isFetching } = useQuery<IStatusCount>({
    queryKey: ['registration-status-count'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/pelayanan/pendaftaran/status/count').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { statusCount: data, loading }
}

export const UseGetRegistration = (props?: RegistrationProps) => {
  const { page, search, limit, status, is_inap, status_rawat_inap } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (status) ParamsSearch.append('status', status ?? '')
  if (is_inap) ParamsSearch.append('is_inap', is_inap ?? 'false')
  if (status_rawat_inap)
    ParamsSearch.append('status_rawat_inap', status_rawat_inap ?? 'MENUNGGU_RUANGAN')

  const { data, isLoading, isFetching } = useQuery<{ data: IRegistration[]; meta: Meta }>({
    queryKey: ['registration', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/pendaftaran?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { registration: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetNomorPendaftaran = () => {
  const { data, isLoading, isFetching } = useQuery<string>({
    queryKey: ['nomor-pendaftaran'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/pelayanan/pendaftaran/nomor-pendaftaran').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { nomorPendaftaran: data, loading }
}

export const UseGetDetailRegistration = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IRegistration>({
    queryKey: ['detail-registration', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/simrs/pelayanan/pendaftaran/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
