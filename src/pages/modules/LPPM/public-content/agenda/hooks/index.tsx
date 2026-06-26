import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

interface IAgendaLppmResponse {
  data: IAgendaDetail[]
  meta: Meta
}

export const UseGetAgendaLppm = (props: IPropsData) => {
  const { page, limit, status_publish, search, year } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search ?? '')
  if (year) ParamsSearch.append('tahun', year ?? '')

  const { data, isLoading, isFetching } = useQuery<IAgendaLppmResponse>({
    queryKey: ['agenda-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { agendaLppm: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAgendaLppmDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-lppm-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaLppmDetail: data, loading }
}

export const UseGetAgendaLppmStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['agenda-lppm-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAgendaLppm = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['agenda-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/agenda/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
