import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface IFAQResponse {
  data: IFAQList[]
  meta: Meta
}

export const UseGetListFAQProdi = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IFAQResponse>({
    queryKey: ['list-faq-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/faqs?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listFaq: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetFAQBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faq-background'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/faq-background').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}
