import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDisposition,
  IDispositionInbox,
} from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  id_unit: string
}

export const UseGetDisposition = (props?: props) => {
  const { id_unit, page, limit, search } = props ?? {}

  const [disposition, setDisposition] = useState<IDisposition[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_unit) Params.append('id_unit', id_unit ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['disposition', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/disposisi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDisposition(data?.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, disposition, meta }
}

export const UseGetDispositionDetail = (id_pejabatInbox: string) => {
  const [dispositionDetail, setDispositionDetail] = useState<IDispositionInbox>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['disposition-detail', id_pejabatInbox],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/disposisi/${id_pejabatInbox}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDispositionDetail(data)
    }
  }, [data])

  return { loading, dispositionDetail }
}

export const UseGetCountDisposition = () => {
  const [count, setCount] = useState<{
    belum_dibaca: number
    belum_direspon: number
    sudah_direspon: number
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['count-disposition'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/surat-masuk/count').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCount(data)
    }
  }, [data])

  return { loading, count }
}

export interface IChartNature {
  id_sifat_surat: string
  nama_sifat: string
  total: number
  created_at?: string
  updated_at?: string
}

export const USeGetDispositionByNature = () => {
  const [nature, setNature] = useState<IChartNature[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['nature-disposition'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/surat-masuk/statistik/sifat').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNature(data ?? [])
    }
  }, [data])

  return { loading, nature }
}
