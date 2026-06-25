import type { IUrlDirectionCampusLife } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextDirectURLLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: IUrlDirectionCampusLife
    en: IUrlDirectionCampusLife
    zh: IUrlDirectionCampusLife
    ar: IUrlDirectionCampusLife
  }>({
    queryKey: ['language-direct-url'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-link-arahan-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
