import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import type { IOfficial } from '../data/types.ts'

interface Props extends BasicProps {
  id_group: string
}

export const UseGetOfficial = (props: Props) => {
  const { id_group, search, page, limit } = props

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IOfficial[]>>({
    queryKey: ['chief-official-spi', id_group, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/spi/pimpinan/${id_group}?${ParamsSearch}`).then((res) => res.data),
  })

  const official: IOfficial[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, official }
}
