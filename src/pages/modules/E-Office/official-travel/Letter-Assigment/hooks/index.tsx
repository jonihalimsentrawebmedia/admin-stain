import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  ILetterAssignment,
  ListLetterAssignment,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'
import type {
  IDetailSPPD,
  IListSPPD,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types.ts'

interface props extends BasicProps {
  tahun: string
  bulan: string
}

export const UseGetLetterAssigment = (props: props) => {
  const { search, page, limit, tahun, bulan } = props

  const [letterAssignment, setLetterAssignment] = useState<ListLetterAssignment[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (tahun) Params.append('tahun', tahun ?? '')
  if (bulan) Params.append('bulan', bulan ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-assignment', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterAssignment(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, letterAssignment }
}

export const UseGetLetterAssigmentDetail = (id: string) => {
  const [detail, setDetail] = useState<ILetterAssignment>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-assignment-detail', id],
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas/${id}`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

interface propsSPPD extends BasicProps {
  id_surat_tugas: string
}

export const LetterAssignmentSPPD = (props: propsSPPD) => {
  const { id_surat_tugas } = props
  const [sppd, setSppd] = useState<IListSPPD[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-assignment-sppd', id_surat_tugas],
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id_surat_tugas}/sppd`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSppd(data)
    }
  }, [data])

  return { sppd, loading }
}

export const UseGetLetterAssigmentDetailSPPD = (id: string, id_sppd: string) => {
  const [detail, setDetail] = useState<IDetailSPPD>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-assignment-detail-sppd', id, id_sppd],
    enabled: !!id_sppd,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id}/sppd/${id_sppd}`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching
  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
