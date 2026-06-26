import type { IThemePMB } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-lembaga/pengaturan/template/model'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetTemplatePMB = (props: BasicProps) => {
  const { page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IThemePMB[]>({
    queryKey: ['template-pmb', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/thema?${Params}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { template: data ?? [], loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const { data, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
