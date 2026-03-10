import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionCarrierCenter {
  id_universitas: string
  id_unit: string
  nama_unit: string
  nama_universitas: string
  singkatan: string
  singkatan_universitas: string
}

export const UseGetSessionCarrierCenter = () => {
  const [session, setSession] = useState<ISessionCarrierCenter>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
