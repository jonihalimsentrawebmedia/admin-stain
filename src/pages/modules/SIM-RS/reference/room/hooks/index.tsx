import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRoom } from '../data/types.ts'

interface Props extends BasicProps {
  id_jenis_ruangan?: string
}

export const UseGetRoom = (props?: Props) => {
  const { page, search, limit, id_jenis_ruangan } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (id_jenis_ruangan) ParamsSearch.append('id_jenis_ruangan', id_jenis_ruangan ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IRoom[]; meta: Meta }>({
    queryKey: ['room', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/simrs/referensi/ruangan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { room: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailRoom = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-room', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/simrs/referensi/ruangan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
