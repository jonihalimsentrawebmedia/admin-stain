import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ICategoryIndustry } from '@/pages/modules/pusat-karir/reference/industry-category/data/type.ts'

export const UseGetIndustryCategory = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const [categoryIndustry, setCategoryIndustry] = useState<ICategoryIndustry[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['industry-category', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/kategori-industri?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCategoryIndustry(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { categoryIndustry, meta, loading }
}
