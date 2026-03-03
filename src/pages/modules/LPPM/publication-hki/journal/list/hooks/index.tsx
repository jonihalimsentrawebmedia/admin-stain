import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListJournal = () => {
  const [linkJournal, setLinkJournal] = useState<{ url: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['journal-link'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/daftar-jurnal').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setLinkJournal(data)
    }
  }, [data])

  return { linkJournal, loading }
}
