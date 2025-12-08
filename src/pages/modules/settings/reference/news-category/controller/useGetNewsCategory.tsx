import { useEffect, useState } from 'react'
import type { NewsCategoryList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'

interface Props {
  isGetAll?: boolean
}

const useGetNewsCategory = (props?: Props) => {
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

  const [newsCategory, setNewsCategory] = useState<NewsCategoryList[]>([])

  const { data, isLoading, isFetching } = useQuery<{
    data: NewsCategoryList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-news-category', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/kategori-berita?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNewsCategory(data.data)
    }
  }, [data])

  return {
    newsCategory,
    loading,
  }
}

export default useGetNewsCategory
