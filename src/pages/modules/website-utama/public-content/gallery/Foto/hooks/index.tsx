import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '../data'

export const UseGetGalleryPhoto = () => {
  const [galleryPhoto, setGalleryPhoto] = useState<IGaleriAlbum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-album', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-album?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGalleryPhoto(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { galleryPhoto, loading, meta }
}

export const UseGetGalleryPhotoDetail = (id: string) => {
  const [detailGalleryPhoto, setDetailGalleryPhoto] = useState<IGaleriAlbum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-album', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-album/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailGalleryPhoto(data)
    }
  }, [data])

  return { detailGalleryPhoto, loading }
}
