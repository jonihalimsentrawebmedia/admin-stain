import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IAgendaDetail, IStatusAgenda } from '../data/index'
import { useSearchParams } from 'react-router-dom'

export const UseGetAgendaList = () => {
  const [listAgenda, setListAgenda] = useState<any>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-agenda-lembaga', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListAgenda(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listAgenda, loading, meta }
}

export const UseGetAgendaDetail = (id: string) => {
  const [detailAgenda, setDetailAgenda] = useState<IAgendaDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-agenda-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailAgenda(data)
    }
  }, [data])

  return { detailAgenda, loading }
}

export const UseGetAgendaStatus = () => {
  const [status, setStatus] = useState<IStatusAgenda>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-agenda-lembaga'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/agenda/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAgenda = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-inovasi-berdampak-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
