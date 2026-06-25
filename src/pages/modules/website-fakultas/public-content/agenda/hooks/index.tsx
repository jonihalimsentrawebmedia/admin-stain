import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetAgendaFaculty = (props: IPropsData) => {
  const { page, limit, status_publish, year, search } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: IAgendaDetail[]; meta: Meta }>({
    queryKey: ['agenda-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  const agendaUnit = data?.data ?? []
  const meta = data?.meta

  return { agendaUnit, loading, meta }
}

export const UseGetAgendaFacultyDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-faculty-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnitDetail: data, loading }
}

export const UseGetAgendaFacultyStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['agenda-faculty-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAgendaFaculty = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-faculty-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['agenda-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/agenda/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
