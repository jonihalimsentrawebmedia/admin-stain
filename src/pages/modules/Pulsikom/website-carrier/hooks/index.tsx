import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCarrierWebsite = () => {
  const [website, setWebsite] = useState<{ url: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['website-carrier'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/website-karir').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setWebsite(data)
    }
  }, [data])

  return { website, loading }
}
