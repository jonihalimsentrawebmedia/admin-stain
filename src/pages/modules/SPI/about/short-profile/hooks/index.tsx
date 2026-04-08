import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IShortProfile {
  url_gambar: string // Image URL
  isi: string // HTML content describing the partner
}

export const UseGetShortProfile = () => {
  const [shortProfile, setShortProfile] = useState<IShortProfile>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['short-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/profile-singkat').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setShortProfile(data)
    }
  }, [data])

  return { loading, shortProfile }
}
