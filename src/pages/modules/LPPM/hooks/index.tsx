import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionLPPM {
  id_universitas: string
  id_lembaga: string
  nama_lembaga: string
  nama_universitas: string
  singkatan: string
  singkatan_universitas: string
}

export const UseGetSessionLPPM = () => {
  const [session, setSession] = useState<ISessionLPPM>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-lppm'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
