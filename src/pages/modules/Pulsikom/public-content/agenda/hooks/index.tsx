import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAgenda = (props: IPropsData) => {
  const { page, limit, status_publish, search, year } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-pusilkom', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAgendaDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-pusilkom-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/pusilkom/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnitDetail: data, loading }
}

export const UseGetAgendaStatus = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-pusilkom-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAgenda = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pusilkom-agenda', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/pusilkom/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['pusilkom-agenda-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/agenda/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
