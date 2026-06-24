import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '../data/types'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { IApiResponse } from '@/utils/globalType.ts'

export const UseGetAgenda = (props: IPropsData) => {
  const { page, limit, status_publish, search, year } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IAgendaDetail[]>>({
    queryKey: ['agenda-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const agendaUnit: IAgendaDetail[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { agendaUnit, loading, meta }
}

export const UseGetAgendaDetail = (id: string) => {
  const { data: agendaUnitDetail, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-spi-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaUnitDetail, loading }
}

export const UseGetAgendaStatus = () => {
  const { data: status, isLoading, isFetching } = useQuery<Record<string, number>>({
    queryKey: ['agenda-spi-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status, loading }
}

export const UseGetLogAgenda = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<unknown[]>({
    queryKey: ['log-spi-agenda', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/agenda-log/${id}`).then((res) => res.data.data),
  })

  const logData: unknown[] = data ?? []
  const loading = isLoading || isFetching

  return { logData, loading }
}

export const UseGetAgendaYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['agenda-spi-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/agenda/tahun').then((res) => res.data?.data),
  })

  const year: number[] = data ?? []
  const loading = isLoading || isFetching

  return { year, loading }
}
