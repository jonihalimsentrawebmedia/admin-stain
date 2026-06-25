// public-fakultas/international-ungreaduate-program

import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IProgramUndergraduate } from '../data/types.ts'

export const UseGetListProgram = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-undergraduate', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/international-ungreaduate-program?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    program: data?.data ?? [] as IProgramUndergraduate[],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}
