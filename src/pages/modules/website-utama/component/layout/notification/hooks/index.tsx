import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface notification {
  id: string
  judul: string
  content: string
  status: string
  email: string
}

export const UseGetNotification = () => {
  const [notification, setNotification] = useState<notification[]>([])

  const ParamsSearch = new URLSearchParams({ page: '0', limit: '0' })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['notification', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/notification?${ParamsSearch}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setNotification(data)
    }
  }, [data])

  return { notification, loading }
}
