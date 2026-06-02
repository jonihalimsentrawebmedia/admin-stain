import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props extends BasicProps {
  id_acara: string
}

export interface MinutesEvent {
  id_acara_notulen: string
  id_acara: string
  id_satuan_organisasi: string
  nama_lengkap: string
  isi_notulen: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetMeetingMinutes = (props: props) => {
  const { search, limit, page, id_acara } = props
  const [minutes, setMinutes] = useState<MinutesEvent[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['meeting-minutes', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara/${id_acara}/notulen`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMinutes(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, minutes }
}
