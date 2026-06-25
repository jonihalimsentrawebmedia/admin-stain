import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { FooterSetting } from '../../hooks/index'

export const UseGetFooterLanguage = () => {
  const { data: queryData, isLoading, isFetching } = useQuery<{
    id: FooterSetting
    en: FooterSetting
    zh: FooterSetting
    ar: FooterSetting
  }>({
    queryKey: ['footer-language'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/footer-translate`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { language: queryData, loading }
}
