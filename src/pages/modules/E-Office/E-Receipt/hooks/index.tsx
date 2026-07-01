import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'

interface props extends BasicProps {
  year?: string
}

export const UseGetEReceipt = (props: props) => {
  const { year, search, page, limit } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (year) Params.append('year', year ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IEreceipt[]; meta: Meta }>({
    queryKey: ['e-receipt', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/kwitansi?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, ereceipt: data?.data ?? [] }
}

export const UseGetEReceiptDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IEreceipt>({
    queryKey: ['e-receipt-detail', id],
    queryFn: () => AxiosClient.get(`/eoffice/kwitansi/${id}`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { loading, eReceipt: data }
}
