import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IDoctor } from '../data/types.ts'

export const UseGetDoctor = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IDoctor[]; meta: Meta }>({
    queryKey: ['doctor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/dokter?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { doctor: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailDoctor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-doctor', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/dokter/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
