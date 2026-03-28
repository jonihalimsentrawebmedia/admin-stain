import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IHistoryAbout {
  url_gambar: string // Image URL
  deskripsi: string // HTML content describing the partner
}

export const UseGetHistoryAbout = () => {
  const [history, setHistory] = useState<IHistoryAbout>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['history-about'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/sejarah').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setHistory(data)
    }
  }, [data])

  return { loading, history }
}
