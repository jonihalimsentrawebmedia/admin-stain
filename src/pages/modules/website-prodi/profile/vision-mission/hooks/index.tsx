import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { VisiMisiList } from '@/pages/modules/website-utama/program-studi/detail/model/visi-misi.tsx'

export const UseVisionMission = () => {
  const [visionMission, setVisionMission] = useState<VisiMisiList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}
