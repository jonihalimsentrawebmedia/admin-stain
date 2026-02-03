import { useEffect, useState } from 'react'
import type { ITestimonialCampusLife } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTestimonyLanguage = (id: string) => {
  const [language, setLanguage] = useState<{
    id: ITestimonialCampusLife
    en: ITestimonialCampusLife
    zh: ITestimonialCampusLife
    ar: ITestimonialCampusLife
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-performance', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/website-utama/kehidupan-kampus-testimoni-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
