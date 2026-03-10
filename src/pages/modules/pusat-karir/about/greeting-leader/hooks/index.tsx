import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProfileLeaderData } from './types.ts'

export const UseGetGreetingLeader = () => {
  const [profileLeader, setProfileLeader] = useState<IProfileLeaderData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-greeting-leader'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/sambutan-kepala').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) setProfileLeader(data)
  }, [data])

  return { profileLeader, loading }
}
