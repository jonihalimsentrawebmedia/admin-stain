import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IAccreditation } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetAccreditation = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.set('search', search ?? '')
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accreditation-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/akreditas?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    accreditation: data?.data as IAccreditation[] ?? [],
    loading,
    meta: data?.meta as Meta | undefined,
  }
}
