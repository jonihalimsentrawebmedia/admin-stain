import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'

interface props {
  isGetAll?: boolean
}

export const UseGetFaqCategoryProdi = (props?: props) => {
  const { isGetAll } = props ?? {}

  const [categoryFaq, setCategoryFaq] = useState<ICategoryFAQ[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  let ParamsSearch: URLSearchParams

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
  } else {
    ParamsSearch = new URLSearchParams({ page, limit })
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-category-faq', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/kategori-faq?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCategoryFaq(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { categoryFaq, loading, meta }
}
