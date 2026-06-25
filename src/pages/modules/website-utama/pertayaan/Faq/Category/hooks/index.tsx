import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'

interface props {
  isGetAll?: boolean
}

export const UseGetFaqCategory = (props?: props) => {
  const { isGetAll } = props ?? {}

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  let ParamsSearch: URLSearchParams

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '1000' })
    ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit })
    ParamsSearch.append('search', search)
  }

  const { data, isLoading, isFetching } = useQuery<{
    data: ICategoryFAQ[]
    meta: Meta
  }>({
    queryKey: ['list-category-faq', isGetAll, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-faq?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { categoryFaq: data?.data ?? [], loading, meta: data?.meta }
}
