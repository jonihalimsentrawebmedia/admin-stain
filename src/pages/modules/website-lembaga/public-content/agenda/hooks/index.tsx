import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IAgendaDetail, IStatusAgenda } from '../data/index'
import { useSearchParams } from 'react-router-dom'

interface IAgendaListResponse {
  data: IAgendaDetail[]
  meta: Meta
}

export const UseGetAgendaList = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const year = searchParams.get('year') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<IAgendaListResponse>({
    queryKey: ['list-agenda-lembaga', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listAgenda: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAgendaDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['detail-agenda-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailAgenda: data, loading }
}

export const UseGetAgendaStatus = () => {
  const { data, isLoading, isFetching } = useQuery<IStatusAgenda>({
    queryKey: ['status-agenda-lembaga'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/agenda/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export interface ILogAgenda {
  id: string
  aktivitas: string
  created_at: string
  created_user: string
  nama_user: string
}

export const UseGetLogAgenda = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogAgenda[]>({
    queryKey: ['log-agenda-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['list-agenda-lembaga-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
