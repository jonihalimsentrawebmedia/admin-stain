import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

interface props extends BasicProps {
  year?: string
  start_month: string
  end_month: string
}

export const UseGetInbox = (props?: props) => {
  const { page, limit, search, year, start_month, end_month } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (year) Params.append('tahun', year ?? '')
  if (start_month) Params.append('bulan_mulai', start_month ?? '')
  if (end_month) Params.append('bulan_selesai', end_month ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IInboxList[]; meta: Meta }>({
    queryKey: ['inbox', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-masuk?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, listInbox: data?.data ?? [], meta: data?.meta }
}

export const ListMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

export const UseGetInboxYear = () => {
  const { data, isLoading, isFetching } = useQuery<string[]>({
    queryKey: ['inbox-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/surat-masuk/tahun-surat`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, yearInbox: data ?? [] }
}
