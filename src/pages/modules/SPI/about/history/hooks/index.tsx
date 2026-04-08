import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetHistory = () => {
  const [history, setHistory] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['history-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/sejarah').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHistory(data)
    }
  }, [data])

  return { history, loading }
}
