import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'

interface DataProps {
  page?: string
  limit?: string
  search?: string
}

interface ICurriculumResponse {
  data: ICurriculum[]
  meta: Meta
}

export const UseGetCurriculum = (props?: DataProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<ICurriculumResponse>({
    queryKey: ['curriculum', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/kurikulum?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { curriculum: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetCurriculumDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICurriculum>({
    queryKey: ['detail-curriculum', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/kurikulum/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detailCurriculum: data, loading }
}
