import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IPrintSettings } from '../printData/types.ts'

interface Props extends BasicProps {
  id_acara: string
}

export interface IAttendance {
  id_acara_daftar_hadir: string
  id_acara: string
  id_satuan_organisasi: string
  nama_lengkap: string
  id_unit: string
  id_unit_kerja: string
  jabatan: string
  no_hp: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_unit: string
  nama_unit_kerja: string
}

export const UseGetAttendance = (props: Props) => {
  const { id_acara, page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IAttendance[]; meta: Meta }>({
    queryKey: ['attendance', Params.toString(), id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/daftar-hadir?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, attendance: data?.data ?? [] }
}

export const UseGetAttendancePrint = (id_acara: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IPrintSettings }>({
    queryKey: ['attendance-print', id_acara],
    refetchOnWindowFocus: false,
    enabled: !!id_acara,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/daftar-hadir/print`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { attendance: data?.data, loading }
}
