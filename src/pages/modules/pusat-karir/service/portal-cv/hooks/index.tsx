import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetUrlPortalCV = () => {
  const [urlPortal, setUrlPortal] = useState<{ url: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['portal-cv'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/portacvats').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUrlPortal(data)
    }
  }, [data])

  return { urlPortal, loading }
}
