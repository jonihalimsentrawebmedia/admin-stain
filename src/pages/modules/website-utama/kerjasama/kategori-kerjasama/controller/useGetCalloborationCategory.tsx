import { useSearchParams } from 'react-router-dom'
import type { CalloborationCategoryList } from '../model'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll?: boolean
}

const useGetCalloborationCategory = (props?: Props) => {
  const { isGetAll = false } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [calloborationCategory, setCaloborationCategory] = useState<CalloborationCategoryList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: CalloborationCategoryList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-calloboration-category', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/kategori-kerjasama?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCaloborationCategory(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    calloborationCategory,
    loading,
    meta,
  }
}

export default useGetCalloborationCategory
