import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IMedicine } from '../data/types.ts'

export const UseGetMedicine = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IMedicine[]; meta: Meta }>({
    queryKey: ['medicine', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/farmasi/obat?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { medicine: data?.data ?? [], meta: data?.meta, loading }
}
