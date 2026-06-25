import type { ICampusLifeUnitActivities } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextUnitActivityLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: ICampusLifeUnitActivities
    en: ICampusLifeUnitActivities
    zh: ICampusLifeUnitActivities
    ar: ICampusLifeUnitActivities
  }>({
    queryKey: ['language-ukm'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-unit-kegiatan-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
