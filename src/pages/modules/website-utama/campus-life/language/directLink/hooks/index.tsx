import { useEffect, useState } from 'react'
import type { IUrlDirectionCampusLife } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextDirectURLLanguage = () => {
  const [language, setLanguage] = useState<{
    id: IUrlDirectionCampusLife
    en: IUrlDirectionCampusLife
    zh: IUrlDirectionCampusLife
    ar: IUrlDirectionCampusLife
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-direct-url'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-link-arahan-translate').then(
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
