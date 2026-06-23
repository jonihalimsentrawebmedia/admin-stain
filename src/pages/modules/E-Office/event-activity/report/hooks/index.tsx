import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  year: string
}

export const UseGetReportEventActivity = (props: props) => {
  const { year, page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (year) Params.append('tahun', year ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: any[]; meta: Meta }>({
    queryKey: ['report-activity', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara/laporan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, report: data?.data ?? [] }
}

export const UseGetEventYear = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: number[] }>({
    queryKey: ['year-activity'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/acara/list-tahun').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { years: data?.data ?? [], loading }
}
