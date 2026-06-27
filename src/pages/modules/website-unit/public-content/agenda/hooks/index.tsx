import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
interface ILogAgenda {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetAgendaUnit = (props: IPropsData) => {
  const { page, limit, status_publish, search, year } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<{ data: IAgendaDetail[]; meta: Meta }>({
    queryKey: ['agenda-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAgendaUnitDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnitDetail: data, loading }
}

export const UseGetAgendaUnitStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['agenda-unit-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAgendaUnit = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogAgenda[]>({
    queryKey: ['log-unit-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['agenda-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/agenda/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
