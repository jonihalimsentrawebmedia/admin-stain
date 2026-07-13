import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRoom } from '../data/types.ts'

export const UseGetRoom = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IRoom[]; meta: Meta }>({
    queryKey: ['room', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/ruangan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { room: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailRoom = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-room', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/ruangan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
