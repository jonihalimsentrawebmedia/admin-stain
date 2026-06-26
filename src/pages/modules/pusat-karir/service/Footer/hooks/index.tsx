// footer-service

import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMainService } from '@/pages/modules/pusat-karir/service/main/data/types.ts'

export const UseGetFooterService = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IMainService[]; meta: Meta }>({
    queryKey: ['footer-service', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { service: data?.data ?? [], loading, meta: data?.meta }
}
