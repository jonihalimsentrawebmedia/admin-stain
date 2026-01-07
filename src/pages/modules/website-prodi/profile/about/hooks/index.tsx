import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { About } from '@/pages/modules/website-utama/program-studi/detail/model/about.tsx'

export const UseGetAboutProfile = () => {
  const [aboutProfile, setAboutProfile] = useState<About>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('prodi/profil/tentang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAboutProfile(data)
    }
  }, [data])

  return { aboutProfile, loading }
}
