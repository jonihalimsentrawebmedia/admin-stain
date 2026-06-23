import { useSearchParams } from 'react-router-dom'
import type { FieldOfCooperationList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll: boolean
}
const useGetFieldOfCooperation = (props?: Props) => {
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

  const { data, isLoading, isFetching } = useQuery<{
    data: FieldOfCooperationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-field-of-cooperation', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/bidang-kerjasama?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    fieldOfCooperation: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetFieldOfCooperation
