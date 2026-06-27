import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { VisiMisiList } from '@/pages/modules/website-utama/program-studi/detail/model/visi-misi.tsx'

export const UseVisionMission = () => {
  const { data, isLoading, isFetching } = useQuery<VisiMisiList>({
    queryKey: ['vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}
