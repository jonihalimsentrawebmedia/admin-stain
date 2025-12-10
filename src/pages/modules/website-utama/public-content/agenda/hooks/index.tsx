import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IStatusAgenda } from '@/pages/modules/website-utama/public-content/agenda/data'
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
    queryKey: ['list-agenda', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/agenda?${ParamsSearch}`).then((res) => res.data),
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
  const [detailAgenda, setDetailAgenda] = useState<any>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/agenda/${id}`).then((res) => res.data.data),
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
    queryKey: ['status-agenda'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/agenda/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}
