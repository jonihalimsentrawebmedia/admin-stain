import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetEthicsCode = () => {
  const [codeEthics, setCodeEthics] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['ethics-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/kode-etik').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCodeEthics(data)
    }
  }, [data])

  return { codeEthics, loading }
}
