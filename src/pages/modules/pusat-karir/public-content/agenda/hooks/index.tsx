import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetAgendaCarrier = (props: IPropsData) => {
  const { page, limit, status_publish, search, year } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<{ data: IAgendaDetail[]; meta: Meta }>({
    queryKey: ['agenda-carrier', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAgendaCarrierDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-carrier-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnitDetail: data, loading }
}

export const UseGetAgendaCarrierStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['agenda-carrier-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAgendaCarrier = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-carrier-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['year-agenda'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/agenda/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
