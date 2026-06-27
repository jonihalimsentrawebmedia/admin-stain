import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListFAQUnit = (props: BasicProps) => {
  const { page, search, limit } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IFAQList[]; meta: Meta }>({
    queryKey: ['list-faq-unit', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/faq?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listFaq: data?.data ?? [], loading, meta: data?.meta }
}
