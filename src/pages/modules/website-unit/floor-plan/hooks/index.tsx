import { useEffect, useState } from 'react'
import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetFloorPlan = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [floorPlan, setFloorPlan] = useState<IFloorPlan[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.set('search', search ?? '')
  if (page) ParamsSearch.set('page', page.toString() ?? '1')
  if (limit) ParamsSearch.set('limit', limit.toString() ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['floor-plan', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/denah-lantai?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFloorPlan(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { floorPlan, loading, meta }
}
