import { useEffect, useState } from 'react'
import type { ProfileData } from './types.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetConsultationCarrier = () => {
  const [consultation, setConsultation] = useState<ProfileData>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['consultation-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/konsultasi-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setConsultation(data)
    }
  }, [data])

  return { consultation, loading }
}
