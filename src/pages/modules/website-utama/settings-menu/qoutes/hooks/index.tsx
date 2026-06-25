import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface quotes {
  isi: string
  pengarang: string
  url_gambar_background: string
}

export const useGetQuotes = () => {
  const { data: queryData, isLoading, isFetching } = useQuery<quotes>({
    queryKey: ['quotes'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/quotes').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { quotes: queryData, loading }
}
