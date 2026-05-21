import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriVideo } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetGalleryVideo = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [video, setVideo] = useState<IGaleriVideo[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-video', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-video?${Params}`).then((res) => res.data),
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
