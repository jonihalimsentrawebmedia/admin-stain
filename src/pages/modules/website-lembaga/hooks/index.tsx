import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionInstitution {
  id_universitas: string
  nama_universitas: string
  singkatan_universitas: string
  id_lembaga: string
  nama_lembaga: string
  singkatan: string
}

export const UseGetInstitutionSession = () => {
  const [session, setSession] = useState<ISessionInstitution>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-institution'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
