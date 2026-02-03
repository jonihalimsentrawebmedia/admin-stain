import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { FooterSetting } from '../../hooks/index'

export const UseGetFooterLanguage = () => {
  const [language, setLanguage] = useState<{
    id: FooterSetting
    en: FooterSetting
    zh: FooterSetting
    ar: FooterSetting
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['footer-language'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/footer-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { language, loading }
}
