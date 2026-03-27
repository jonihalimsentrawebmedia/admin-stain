import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionPPSM } from './types.tsx'

export const UseGetDetailPPSM = () => {
  const [description, setDescription] = useState<IDescriptionPPSM>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['ppsm-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/deskripsi-ppsm').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
