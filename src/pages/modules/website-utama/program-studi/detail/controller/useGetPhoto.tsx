import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

interface GaleriFoto {
  id_galeri_foto: string // UUID
  id_satuan_organisasi: string // UUID
  id_album: string // UUID
  judul: string
  slug: string
  link_foto: string // URL String

  // Metadata & Tracking
  created_at: string // ISO Date String
  created_user: string
  updated_at: string // ISO Date String
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
const useGetPhoto = () => {
  const [galleryPhoto, setGalleryPhoto] = useState<GaleriFoto[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id, idGallery } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  if (idGallery) {
    searchParams.set('id_album', idGallery)
  }
  const id_album = searchParams.get('id_album') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_album })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-gallery-photo', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/galeri-foto?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGalleryPhoto(data?.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { galleryPhoto, loading, meta }
}

export default useGetPhoto
