import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface quotes {
  isi: string
  pengarang: string
  gambar_background: string
}

export const useGetQuotes = () => {
  const [quotes, setQuotes] = useState<quotes>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['quotes'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/quotes').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setQuotes(data)
    }
  }, [data])

  return { quotes, loading }
}
