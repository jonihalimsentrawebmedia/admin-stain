import type { ICampusLifeIntroduction } from '@/pages/modules/website-utama/campus-life/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextIntroduceLanguage = () => {
  const { data, isLoading, isFetching } = useQuery<{
    id: ICampusLifeIntroduction
    en: ICampusLifeIntroduction
    zh: ICampusLifeIntroduction
    ar: ICampusLifeIntroduction
  }>({
    queryKey: ['language-introduce'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-pengantar-translate').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
