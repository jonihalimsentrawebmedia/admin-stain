import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionPmb } from './types.tsx'

export const UseGetDetailPmb = () => {
  const [description, setDescription] = useState<IDescriptionPmb>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['description-pmb'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/pmb').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
