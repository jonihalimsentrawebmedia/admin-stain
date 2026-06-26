import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { ISpecialization } from '../data/types'

export const UseGetSpecialization = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: ISpecialization[]; meta: Meta }>({
    queryKey: ['specialization', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusat-karir/spesialisasi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { specialization: data?.data ?? [], meta: data?.meta, loading }
}

export const USeGetDetailSpecialization = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISpecialization>({
    queryKey: ['detail-specialization', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusat-karir/spesialisasi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
