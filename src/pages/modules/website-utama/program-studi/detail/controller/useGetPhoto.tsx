import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
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

interface GaleriFotoResponse {
  data: GaleriFoto[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const useGetPhoto = () => {
  const { id, idGallery } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_album = idGallery ?? searchParams.get('id_album') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_album })
  const { data, isLoading, isFetching } = useQuery<GaleriFotoResponse>({
    queryKey: ['program-studi-gallery-photo', id, id_album, ParamsSearch.toString()],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/galeri-foto?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { galleryPhoto: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetPhoto
