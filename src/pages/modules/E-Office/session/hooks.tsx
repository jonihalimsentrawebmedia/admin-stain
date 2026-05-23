import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface SessionEOffice {
  id_satuan_organisasi: string
  nama_satuan_organisasi: string
  singkatan: string | null
  domain: string
}

export const UseGetSessionEOffice = () => {
  const [session, setSession] = useState<SessionEOffice>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session'],
    queryFn: () => AxiosClient.get('/eoffice/user-session').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
