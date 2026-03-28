import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionPusilkom {
  id_universitas: string
  id_unit: string
  nama_unit: string
  nama_universitas: string
  singkatan: string
  singkatan_fakultas: string
  singkatan_universitas: string
}

export const UseGetSessionPusilkom = () => {
  const [session, setSession] = useState<ISessionPusilkom>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-pulsikom'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
