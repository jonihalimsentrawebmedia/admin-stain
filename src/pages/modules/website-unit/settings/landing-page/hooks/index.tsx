import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IUnitLandingPage } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetUnitLandingPage = (props: BasicProps) => {
  const { page, search, limit } = props

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (search) Params.set('search', search ?? '')
  if (limit) Params.set('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IUnitLandingPage[]; meta: Meta }>({
    queryKey: ['landing-unit', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/landing-page?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { unitLanding: data?.data ?? [], loading, meta: data?.meta }
}
