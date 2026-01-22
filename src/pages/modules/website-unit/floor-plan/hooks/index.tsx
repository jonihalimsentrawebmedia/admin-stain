import { useEffect, useState } from 'react'
import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetFloorPlan = () => {
  const [floorPlan, setFloorPlan] = useState<IFloorPlan[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['floor-plan'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/denah-lantai').then((res) => res.data),
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
