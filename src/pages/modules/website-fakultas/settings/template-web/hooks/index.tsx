import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-lembaga/pengaturan/template/model'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetTemplateFaculty = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IThemeUnit[]>({
    queryKey: ['template-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/thema?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { template: data ?? [], loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const { data, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
