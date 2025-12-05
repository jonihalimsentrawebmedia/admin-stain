import { useEffect, useState } from 'react'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetUniversityData = () => {
  const [detailUniversity, setDetailUniversity] = useState<IDetailUniversity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-university'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/profil').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailUniversity(data)
    }
  }, [data])

  return { detailUniversity, loading }
}
