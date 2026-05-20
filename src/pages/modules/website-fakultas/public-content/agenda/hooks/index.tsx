import { useEffect, useState } from 'react'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetAgendaFaculty = (props: IPropsData) => {
  const { page, limit, status_publish, year, search } = props
  const [agendaUnit, setAgendaUnit] = useState<IAgendaDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setAgendaUnit(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { agendaUnit, loading, meta }
}

export const UseGetAgendaFacultyDetail = (id: string) => {
  const [agendaUnitDetail, setAgendaUnitDetail] = useState<IAgendaDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-faculty-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAgendaUnitDetail(data)
    }
  }, [data])

  return { agendaUnitDetail, loading }
}

export const UseGetAgendaFacultyStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-faculty-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAgendaFaculty = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-faculty-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetAgendaYear = () => {
  const [year, setYear] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/agenda/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data)
    }
  }, [data])

  return { year, loading }
}
