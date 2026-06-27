import type { IProdiBackground } from '@/pages/modules/website-prodi/settings/background/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  page: string
  limit: string
  context?: string
}

interface IBackgroundResponse {
  data: IProdiBackground[]
  meta: Meta
}

export const UseGetProdiBackground = (props?: Props) => {
  const { page, limit, context } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (context) ParamsSearch.append('context', context)

  const { data, isLoading, isFetching } = useQuery<IBackgroundResponse>({
    queryKey: ['prodi-background', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/prodi-background?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { prodiBackground: data?.data ?? [], loading, meta: data?.meta }
}
