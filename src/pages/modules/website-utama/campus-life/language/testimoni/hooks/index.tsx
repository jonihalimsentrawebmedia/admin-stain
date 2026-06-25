import type { ITestimonialCampusLife } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTestimonyLanguage = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: ITestimonialCampusLife
    en: ITestimonialCampusLife
    zh: ITestimonialCampusLife
    ar: ITestimonialCampusLife
  }>({
    queryKey: ['language-testimoni', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient(`/website-utama/kehidupan-kampus-testimoni-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { data, loading }
}
