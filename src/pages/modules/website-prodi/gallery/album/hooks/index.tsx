import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import type { BasicProps } from '@/utils/globalType.ts'
import { useSearchParams } from 'react-router-dom'

interface IAlbumResponse {
  data: IGaleriAlbum[]
  meta: Meta
}

interface IAlbumLog {
  id: string
  [key: string]: unknown
}

export const UseGetGalleryAlbumProdi = (props?: BasicProps) => {
  const [searchParams] = useSearchParams()
  const { page: p, limit: l, search: s } = props ?? {}
  const page = p ?? searchParams.get('page') ?? '1'
  const limit = l ?? searchParams.get('limit') ?? '10'
  const search = s ?? searchParams.get('search') ?? ''

  const Params = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<IAlbumResponse>({
    queryKey: ['album-prodi', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { albumProdi: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetGalleryAlbumProdiById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGaleriAlbum>({
    queryKey: ['album-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { albumProdi: data, loading }
}

export const UseGetGalleryAlbumProdiLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IAlbumLog[]; meta: Meta }>({
    queryKey: ['album-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { albumProdiLog: data?.data ?? [], loading, meta: data?.meta }
}
