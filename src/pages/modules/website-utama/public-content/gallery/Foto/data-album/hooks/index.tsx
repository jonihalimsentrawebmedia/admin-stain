import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGalleryPhoto } from '../data/index'

export const UseGetGalleryAlbum = (id: string) => {
  const [galleryAlbum, setGalleryAlbum] = useState<IGalleryPhoto[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (id) ParamsSearch.append('id_album', id)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-photo', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-foto?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGalleryAlbum(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { galleryAlbum, loading, meta }
}

export const UseGetGalleryPhotoDetail = (id: string) => {
  const [detailGalleryPhoto, setDetailGalleryPhoto] = useState<IGalleryPhoto>()
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-photo', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-foto/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setDetailGalleryPhoto(data)
    }
  },[data])
  
  return { detailGalleryPhoto, loading }
  
}

export const UseGetLogAlbumPhoto = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-photo-album', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/galeri-foto-log/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])
  
  return { logData, loading }
}