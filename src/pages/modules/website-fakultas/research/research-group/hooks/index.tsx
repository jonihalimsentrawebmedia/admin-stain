import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescriptionGroupSkill } from './types.tsx'

export const UseGetDetailGroupSKill = () => {
  const [description, setDescription] = useState<IDescriptionGroupSkill>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['group-skill'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/kelompok-penelitian').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
