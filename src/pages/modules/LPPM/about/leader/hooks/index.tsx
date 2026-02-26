import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProfileLeader } from '@/pages/modules/LPPM/about/leader/hooks/types.ts'

export const UseGetProfileLeader = () => {
  const [profileLeader, setProfileLeader] = useState<IProfileLeader>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-profile-leader'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/ketua').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) setProfileLeader(data)
  }, [data])

  return { profileLeader, loading }
}
