import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type {
  AgendaSummary,
  IInboxAgenda,
} from '@/pages/modules/E-Office/agenda/inbox/data/types.ts'

interface props extends BasicProps {
  tahun?: string
  id_unit?: string
  id_asal_surat?: string
}

export const UseGetAgendaOutboxPage = (props: props) => {
  const { tahun, id_unit, id_asal_surat, page, limit, search } = props
  const [agendaOutbox, setAgendaOutbox] = useState<IInboxAgenda[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (tahun) Params.append('tahun', tahun ?? '')
  if (id_unit) Params.append('id_unit', id_unit ?? '')
  if (id_asal_surat) Params.append('id_asal_surat', id_asal_surat ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-outbox', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/agenda/keluar?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAgendaOutbox(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, agendaOutbox, meta }
}

export const USeGetStatisticsAgendaOutbox = () => {
  const [statistics, setStatistics] = useState<AgendaSummary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['statistics-agenda-outbox'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/agenda/statistik/keluar').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatistics(data)
    }
  }, [data])

  return { loading, statistics }
}
