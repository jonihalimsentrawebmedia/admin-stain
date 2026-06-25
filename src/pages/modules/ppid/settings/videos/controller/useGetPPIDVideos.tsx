import type { PPIDSetingsVideo } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetPPIDVideos = () => {

  const { data, isLoading, isFetching } = useQuery<{
    data: PPIDSetingsVideo
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['video-pengaturan-unit-ppid'],
    queryFn: () => AxiosClient.get(`/unit-ppid/video-profile`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    video: data?.data ?? null,
    loading,
  }
}

export default useGetPPIDVideos
