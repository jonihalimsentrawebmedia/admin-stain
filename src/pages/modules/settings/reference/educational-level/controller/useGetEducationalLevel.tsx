import type { EducationalLevelList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll?: boolean
}
const useGetEducationalLevel = (props: Props) => {
  const { isGetAll=false } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: EducationalLevelList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-educational-level', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/referensi/jenjang-pendidikan?${isGetAll ? '' : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    educationalLevel: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetEducationalLevel
