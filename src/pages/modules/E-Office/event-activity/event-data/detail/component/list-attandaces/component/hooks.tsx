import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

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
  const [attendance, setAttendance] = useState<IAttendance[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['attendance', Params.toString(), id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/daftar-hadir?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAttendance(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, attendance }
}
