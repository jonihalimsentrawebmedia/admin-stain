import { useEffect, useState } from 'react'
import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetGalleryVideoProdi = () => {
  const [galleryVideo, setGalleryVideo] = useState<IGalleryVideo[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['video-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-video?${ParamsSearch}`).then((res) => res.data),
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
