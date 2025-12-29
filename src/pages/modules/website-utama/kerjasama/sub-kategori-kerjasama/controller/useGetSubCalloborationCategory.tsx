import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SubCalloborationCategory } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll: boolean
  id_kategori_kerjasama: string
}
const useGetSubCalloborationCategory = (props?: Props) => {
  const { isGetAll = false, id_kategori_kerjasama } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
    ParamsSearch.append('id_kategori_kerjasama', id_kategori_kerjasama ?? '')
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [subCalloborationCategory, setSubCaloborationCategory] = useState<
    SubCalloborationCategory[]
  >([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SubCalloborationCategory[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-sub-calloboration-category', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/sub-kategori-kerjasama?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubCaloborationCategory(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    subCalloborationCategory,
    loading,
    meta,
  }
}

export default useGetSubCalloborationCategory
