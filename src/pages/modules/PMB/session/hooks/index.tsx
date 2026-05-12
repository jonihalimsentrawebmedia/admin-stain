import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionPMB {
  id_universitas: string
  id_unit: string
  nama_unit: string
  nama_universitas: string
  singkatan: string
  singkatan_universitas: string
  domain: string
}

export const UseGetSessionPMB = () => {
  const [session, setSession] = useState<ISessionPMB>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-pmb'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pmb/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
