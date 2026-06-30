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

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (tahun) Params.append('tahun', tahun ?? '')
  if (bulan) Params.append('bulan', bulan ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ListLetterAssignment[]; meta: Meta }>({
    queryKey: ['letter-assignment', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, letterAssignment: data?.data ?? [] }
}

export const UseGetLetterAssigmentDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILetterAssignment>({
    queryKey: ['letter-assignment-detail', id],
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas/${id}`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

interface propsSPPD extends BasicProps {
  id_surat_tugas: string
}

export const LetterAssignmentSPPD = (props: propsSPPD) => {
  const { id_surat_tugas } = props

  const { data, isLoading, isFetching } = useQuery<IListSPPD[]>({
    queryKey: ['letter-assignment-sppd', id_surat_tugas],
    enabled: !!id_surat_tugas,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id_surat_tugas}/sppd`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { sppd: data ?? [], loading }
}

export const UseGetLetterAssigmentDetailSPPD = (id: string, id_sppd: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailSPPD>({
    queryKey: ['letter-assignment-detail-sppd', id, id_sppd],
    enabled: !!id && !!id_sppd,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id}/sppd/${id_sppd}`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetLetterAssignmentYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['letter-assignment-year'],
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas/tahun`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  console.log(data)

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
