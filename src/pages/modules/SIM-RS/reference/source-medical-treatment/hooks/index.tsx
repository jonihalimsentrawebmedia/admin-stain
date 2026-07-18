import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { ISumberBiaya } from '../data/types.ts'

export const UseGetSumberBiaya = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: ISumberBiaya[]; meta: Meta }>({
    queryKey: ['sumber-biaya', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/referensi/sumber-biaya-pengobatan?${ParamsSearch}`).then(
        (res) => res.data,
      ),
  })

  const loading = isLoading || isFetching

  return { sumberBiaya: data?.data ?? [], meta: data?.meta, loading }
}
