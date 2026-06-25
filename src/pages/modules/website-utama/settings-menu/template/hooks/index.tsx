import { useQuery } from '@tanstack/react-query'
import type { IThemeUnit, ThemeColor } from '../data/types.ts'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetTemplateMainWeb = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<IThemeUnit[]>({
    queryKey: ['template-main', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/thema?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { template: queryData ?? [], loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const { data: queryData, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    enabled: !!slug,
    queryFn: () =>
      AxiosClient.get(`/website-utama/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: queryData, loading }
}
