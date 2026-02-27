import { useEffect, useState } from 'react'
import type { IPLanResearchCategory } from '@/pages/modules/LPPM/research/plan/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetResearchPlan = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const [researchPlan, setResearchPlan] = useState<IPLanResearchCategory[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['research-plan', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian-kategori?${ParamsSearch}`).then((res) => {
        return res.data
      }),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResearchPlan(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { researchPlan, meta, loading }
}

export const UseGetResearchPlanDetail = (id: string) => {
  const [detail, setDetail] = useState<IPLanResearchCategory>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['research-plan-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian-kategori/${id}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
