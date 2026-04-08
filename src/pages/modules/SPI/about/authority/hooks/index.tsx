import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAuthoritySPI = () => {
  const [authority, setAuthority] = useState<{
    tugas: string
    wewenang: string
  }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['authority-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/tugas-wewenang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAuthority(data)
    }
  }, [data])

  return { authority, loading }
}
