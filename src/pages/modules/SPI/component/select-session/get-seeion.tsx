import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface ISessionSPI {
  id_universitas: string
  id_unit: string
  nama_unit: string
  nama_universitas: string
  singkatan: string
  singkatan_fakultas: string
  singkatan_universitas: string
}

export const UseGetSessionSPI = () => {
  const [session, setSession] = useState<ISessionSPI>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['session-SPI'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/user-session').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSession(data)
    }
  }, [data])

  return { session, loading }
}
