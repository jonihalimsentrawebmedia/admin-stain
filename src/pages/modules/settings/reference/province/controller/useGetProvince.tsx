import { useSearchParams } from 'react-router-dom'
import type { ProvinceList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
  isGetAll: boolean
  id_negara?: string
}

const useGetProvince = (props?: Props) => {
  const { isGetAll = false, id_negara } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '0', limit: '0' })
    ParamsSearch.append('search', search)
    ParamsSearch.append('id_negara', id_negara ?? '')
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const { data, isLoading, isFetching } = useQuery<{
    data: ProvinceList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-province', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/provinsi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    province: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetProvince
