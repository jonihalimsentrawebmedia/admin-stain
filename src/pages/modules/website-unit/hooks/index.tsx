import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionUnit {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_unit: string
  nama_unit: string
  singkatan: string
}

export const UseGetSessionUnit = () => {
  const [session, setSession] = useState<ISessionUnit>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
