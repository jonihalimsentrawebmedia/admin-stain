import { useQuery } from '@tanstack/react-query'
import type { IStructuralPosition } from '../../data/types'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStructuralLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: IStructuralPosition
    en: IStructuralPosition
    zh: IStructuralPosition
    ar: IStructuralPosition
  }>({
    queryKey: ['structural-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/jabatan-struktural-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}
