import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDisposition,
  IDispositionInbox,
} from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetDisposition = () => {
  const [disposition, setDisposition] = useState<IDisposition[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['disposition'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/surat-masuk/disposisi').then((res) => res.data),
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
