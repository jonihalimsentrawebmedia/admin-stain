import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

interface props extends BasicProps {
  year?: string
  start_month?: string
  end_month?: string
}

export const UseGetOutbox = (props?: props) => {
  const { page, limit, search, year, start_month, end_month } = props ?? {}
  const [listInbox, setListInbox] = useState<IInboxList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (year) Params.append('tahun', year ?? '')
  if (start_month) Params.append('bulan_mulai', start_month ?? '')
  if (end_month) Params.append('bulan_akhir', end_month ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['outbox', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-keluar?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListInbox(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, listInbox, meta }
}

export const UseGetOutboxYear = () => {
  const [yearOutbox, setYearOutbox] = useState<string[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['year-outbox'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/surat-keluar/tahun-surat').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYearOutbox(data)
    }
  }, [data])

  return { yearOutbox, loading }
}
