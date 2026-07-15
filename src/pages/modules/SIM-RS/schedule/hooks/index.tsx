import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IDokterJadwal } from '../data/types.ts'

export const UseGetDokterJadwal = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IDokterJadwal[]; meta: Meta }>({
    queryKey: ['dokter-jadwal', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/jadwal-dokter/daftar-dokter?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { dokterJadwal: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDoctorSchedule = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDokterJadwal>({
    queryKey: ['doctor-schedule', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/jadwal-dokter/daftar-dokter/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
