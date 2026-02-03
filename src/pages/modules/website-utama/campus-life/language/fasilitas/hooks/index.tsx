import { useEffect, useState } from 'react'
import type { ICampusLifeFacilities } from '../../../types/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTextFacilitiesLanguage = () => {
  const [language, setLanguage] = useState<{
    id: ICampusLifeFacilities
    en: ICampusLifeFacilities
    zh: ICampusLifeFacilities
    ar: ICampusLifeFacilities
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['language-fasilitas'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient('/website-utama/kehidupan-kampus-fasilitas-translate').then(
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
