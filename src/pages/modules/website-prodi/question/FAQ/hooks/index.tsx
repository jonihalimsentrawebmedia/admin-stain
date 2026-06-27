import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IFAQResponse {
  data: IFAQList[]
  meta: Meta
}

export const UseGetListFAQProdi = () => {
  const { data, isLoading, isFetching } = useQuery<IFAQResponse>({
    queryKey: ['list-faq-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/faqs').then((res) => res.data),
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
