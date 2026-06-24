import type { IThemeUnit, ThemeColor } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetTemplateSPI = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IThemeUnit[]>>({
    queryKey: ['template-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/thema?${ParamsSearch}`).then((res) => res.data),
  })

  const template: IThemeUnit[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { template, loading, meta }
}

export const UseGetTemplateDetail = (slug: string) => {
  const { data: detail, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail, loading }
}
