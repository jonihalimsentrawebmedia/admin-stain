import { useEffect, useState } from 'react'
import type { ICampusLifeIntroduction } from '@/pages/modules/website-utama/campus-life/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextIntroduceLanguage = () => {
  const [language, setLanguage] = useState<{
    id: ICampusLifeIntroduction
    en: ICampusLifeIntroduction
    zh: ICampusLifeIntroduction
    ar: ICampusLifeIntroduction
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-introduce'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-pengantar-translate').then(
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
