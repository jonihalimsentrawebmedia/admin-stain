import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { VisiMisiUnitList } from '../model'
interface Props {
  isGetAll?: boolean
}
const useGetVisiMisiUnit = (props: Props) => {
  const { isGetAll=false } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: VisiMisiUnitList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-unit-ppid', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/unit-ppid/visi-misi?${isGetAll ? '' : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    visiMisi: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetVisiMisiUnit
