import { useEffect, useState } from 'react'
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
  const [workResponsibilities, setWorkResponsibilities] = useState<WorkResponsibilitiesList[]>([])
  const [meta, setMeta] = useState<Meta>()

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

  useEffect(() => {
    if (data) {
      setWorkResponsibilities(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    workResponsibilities,
    loading,
    meta,
  }
}

export default useGetWorkResponsibilities
