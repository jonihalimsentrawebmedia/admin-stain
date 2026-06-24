import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  id_group: string
}

export const UseGetOfficially = (props: Props) => {
  const { id_group, search, page, limit } = props

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['chief-officially', id_group, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    enabled: !!id_group,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/pimpinan/${id_group}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, officially: data?.data ?? [] }
}
