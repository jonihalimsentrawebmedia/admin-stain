import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IVisitReportStats, IVisitReportList } from '../data/types.ts'

interface Props extends BasicProps {
  id_poli?: string
  id_dokter?: string
  status?: string
}

export const UseGetVisitReportStats = () => {
  const { data, isLoading, isFetching } = useQuery<IVisitReportStats>({
    queryKey: ['visit-report-stats'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/simrs/laporan/kunjungan/stats').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { stats: data, loading }
}

export const UseGetVisitReportList = (props?: Props) => {
  const { page, search, limit, id_poli, id_dokter, status } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (id_poli) ParamsSearch.append('id_poli', id_poli ?? '')
  if (id_dokter) ParamsSearch.append('id_dokter', id_dokter ?? '')
  if (status) ParamsSearch.append('status', status ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: IVisitReportList[]
    meta: Meta
  }>({
    queryKey: ['visit-report-list', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/laporan/kunjungan/list?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { list: data?.data ?? [], meta: data?.meta, loading }
}
