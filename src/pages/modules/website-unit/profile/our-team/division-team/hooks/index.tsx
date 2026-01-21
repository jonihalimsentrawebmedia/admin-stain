import { useEffect, useState } from 'react'
import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDivisionTeam = (id: string) => {
  const [divisionTeam, setDivisionTeam] = useState<IDivisionTeam[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['division-team', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/tim-pejabat/${id}/pejabat`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDivisionTeam(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { divisionTeam, loading, meta }
}
