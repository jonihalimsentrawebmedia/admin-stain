import type { ThemeColor } from '../model/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateDetail = (slug: string) => {
  const { data, isLoading, isFetching } = useQuery<ThemeColor>({
    queryKey: ['template-detail', slug],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/thema/${slug}/color`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
