import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListJournal = () => {
  const { data, isLoading, isFetching } = useQuery<{ url: string }>({
    queryKey: ['journal-link'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/daftar-jurnal').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { linkJournal: data, loading }
}
