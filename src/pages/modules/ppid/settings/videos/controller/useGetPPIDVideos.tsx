import { useEffect, useState } from 'react'
import type { PPIDSetingsVideo } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetPPIDVideos = () => {
  const [video, setVideo] = useState<PPIDSetingsVideo>()

  const { data, isLoading, isFetching } = useQuery<{
    data: PPIDSetingsVideo
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['video-pengaturan-unit-ppid'],
    queryFn: () => AxiosClient.get(`/unit-ppid/video-profile`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVideo(data.data ?? null)
    }
  }, [data])

  return {
    video,
    loading,
  }
}

export default useGetPPIDVideos
