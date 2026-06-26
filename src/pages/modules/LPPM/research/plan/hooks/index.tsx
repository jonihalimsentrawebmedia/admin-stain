import type { IPLanResearchCategory } from '@/pages/modules/LPPM/research/plan/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface PlanResearchResponse {
  data: IPLanResearchCategory[]
  meta: Meta
}

export const UseGetResearchPlan = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<PlanResearchResponse>({
    queryKey: ['research-plan', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian-kategori?${ParamsSearch}`).then((res) => {
        return res.data
      }),
  })

  const loading = isLoading || isFetching

  return { researchPlan: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetResearchPlanDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IPLanResearchCategory>({
    queryKey: ['research-plan-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian-kategori/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
