import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IUnitLandingPage } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetUnitLandingPage = (props: BasicProps) => {
  const { page, search, limit } = props

  const [unitLanding, setUnitLanding] = useState<IUnitLandingPage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (search) Params.set('search', search ?? '')
  if (limit) Params.set('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['landing-unit', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/landing-page?${Params}`).then((res) => res.data),
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
