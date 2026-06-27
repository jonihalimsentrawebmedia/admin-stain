import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ThemeColor } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetTemplateUnit = (props: basicProps) => {
  const { page, limit, search } = props

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IThemeUnit[]>({
    queryKey: ['template-unit', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { templateUnit: data ?? [], loading }
}

export const UseGetTemplateDetail = (slug: string) => {
  const { data, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
