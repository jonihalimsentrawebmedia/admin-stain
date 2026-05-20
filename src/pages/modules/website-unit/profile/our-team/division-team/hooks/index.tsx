import { useEffect, useState } from 'react'
import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  id: string
}

export const UseGetDivisionTeam = (props?: props) => {
  const { id, page, limit, search } = props ?? {}
  const [divisionTeam, setDivisionTeam] = useState<IDivisionTeam[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page.toString() ?? '1')
  if (limit) params.append('limit', limit.toString() ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['division-team', id, params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/tim-pejabat/${id}/pejabat?${params}`).then((res) => res.data),
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
