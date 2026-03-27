import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriVideo } from '../data/types'

export const UseGetGalleryVideo = () => {
  const [video, setVideo] = useState<IGaleriVideo[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-video'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/galeri-video').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVideo(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { video, loading, meta }
}
