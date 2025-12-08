import { useEffect, useState } from 'react'
import type { NewsCategoryList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'

const useGetNewsCategory = () => {
  const [searchParams] = useSearchParams()
  const [meta,setMeta]=useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const [newsCategory, setNewsCategory] = useState<NewsCategoryList[]>([])

  const { data, isLoading, isFetching } = useQuery<{
    data: NewsCategoryList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-news-category', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/kategori-berita?${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNewsCategory(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return {
    newsCategory,
    loading,meta
  }
}

export default useGetNewsCategory
