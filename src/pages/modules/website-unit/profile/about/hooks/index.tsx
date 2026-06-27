import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { About } from '@/pages/modules/website-utama/program-studi/detail/model/about.tsx'

export const UseGetAboutUnit = () => {
  const { data, isLoading, isFetching } = useQuery<About>({
    queryKey: ['about-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/tentang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { aboutProfile: data, loading }
}
