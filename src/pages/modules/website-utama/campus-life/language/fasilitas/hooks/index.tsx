import type { ICampusLifeFacilities } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextFacilitiesLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: ICampusLifeFacilities
    en: ICampusLifeFacilities
    zh: ICampusLifeFacilities
    ar: ICampusLifeFacilities
  }>({
    queryKey: ['language-fasilitas'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-fasilitas-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
