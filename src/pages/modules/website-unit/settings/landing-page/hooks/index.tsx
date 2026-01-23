import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IUnitLandingPage } from '../data/types'

export const UseGetUnitLandingPage = () => {
  const [unitLanding, setUnitLanding] = useState<IUnitLandingPage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['landing-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/landing-page').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitLanding(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { unitLanding, loading, meta }
}
