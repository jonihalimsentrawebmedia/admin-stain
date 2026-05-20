import { useEffect, useState } from 'react'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetDivisionUnit = (props?: basicProps) => {
  const { page, limit, search } = props ?? {}

  const [division, setDivision] = useState<IUnitTeamGroup[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')
  if (search) ParamsSearch.set('search', search.toString() ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['division-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/tim?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDivision(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { division, loading, meta }
}

export const UseGetDivisionDetail = (id: string) => {
  const [unitTeam, setUnitTeam] = useState<IUnitTeamGroup>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['division-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/profil/tim/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitTeam(data)
    }
  }, [data])

  return { unitTeam, loading }
}
