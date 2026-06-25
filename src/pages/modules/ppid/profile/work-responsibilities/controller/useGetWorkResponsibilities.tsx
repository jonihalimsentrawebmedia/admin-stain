import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { WorkResponsibilitiesList } from '../model'
interface Props {
  isGetAll?: boolean
}
const useGetWorkResponsibilities = (props: Props) => {
  const { isGetAll=false } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: WorkResponsibilitiesList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['work-responsibilities', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/unit-ppid/tugas-fungsi-tanggung-jawab?${isGetAll ? '' : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    workResponsibilities: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetWorkResponsibilities
