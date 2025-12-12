import { useEffect, useState } from 'react'
import type { IGalleryVideo } from '../data/index'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetGalleryVideo = () => {
  const [galleryVideo, setGalleryVideo] = useState<IGalleryVideo[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-video', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-video?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGalleryVideo(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { galleryVideo, loading, meta }
}
