import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPatientReportStats, IPatientReportList } from '../data/types.ts'

export const UseGetPatientReportStats = () => {
  const { data, isLoading, isFetching } = useQuery<IPatientReportStats>({
    queryKey: ['patient-report-stats'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/laporan/pasien/stats').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { stats: data, loading }
}

export const UseGetPatientReportList = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{
    data: IPatientReportList[]
    meta: Meta
  }>({
    queryKey: ['patient-report-list', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/laporan/pasien/list?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { list: data?.data ?? [], meta: data?.meta, loading }
}
