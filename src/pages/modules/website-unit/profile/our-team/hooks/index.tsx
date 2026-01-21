import { useEffect, useState } from 'react'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDivisionUnit = () => {
  const [division, setDivision] = useState<IUnitTeamGroup[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['division-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/tim').then((res) => res.data),
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
