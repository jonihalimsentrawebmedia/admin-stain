import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFacilities } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetFacilitiesList = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (props?.search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IFacilities[]; meta: Meta }>({
    queryKey: ['facilities', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/fasilitas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listFacilities: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDetailFacilities = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IFacilities>({
    queryKey: ['facilities-detail'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/fasilitas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
