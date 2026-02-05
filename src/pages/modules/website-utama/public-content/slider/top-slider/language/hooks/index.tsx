import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IListSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'

export const UseGetTopSliderLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: IListSlider
    en: IListSlider
    zh: IListSlider
    ar: IListSlider
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['top-slider-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/slider-atas-translate/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}
