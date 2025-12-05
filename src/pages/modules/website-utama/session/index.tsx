import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface session {
  singkatan:string
  id_satuan_organisasi:string
  nama_satuan_organisasi:string
}

export const UseGetSession = () => {
  const [session, setSession] = useState<session>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/user-session').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
