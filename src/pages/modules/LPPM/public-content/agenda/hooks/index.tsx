import { useEffect, useState } from 'react'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetAgendaLppm = (props: IPropsData) => {
  const { page, limit, status_publish } = props
  const [agendaLppm, setAgendaLppm] = useState<IAgendaDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setAgendaLppm(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { agendaLppm, loading, meta }
}

export const UseGetAgendaLppmDetail = (id: string) => {
  const [agendaLppmDetail, setAgendaLppmDetail] = useState<IAgendaDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-lppm-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAgendaLppmDetail(data)
    }
  }, [data])

  return { agendaLppmDetail, loading }
}

export const UseGetAgendaLppmStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-lppm-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAgendaLppm = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
