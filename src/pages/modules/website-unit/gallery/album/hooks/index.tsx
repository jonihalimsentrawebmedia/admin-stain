import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetGalleryAlbumUnit = (props: basicProps) => {
  const { page, search, limit } = props

  const params = new URLSearchParams()
  if (page) params.set('page', page ?? '1')
  if (limit) params.set('limit', limit ?? '10')
  if (search) params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriAlbum[]; meta: Meta }>({
    queryKey: ['album-unit', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { albumUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetGalleryAlbumUnitById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGaleriAlbum>({
    queryKey: ['album-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { albumUnitDetail: data, loading }
}

export const UseGetGalleryAlbumUnitLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: unknown[]; meta: Meta }>({
    queryKey: ['album-unit-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { albumUnitLog: data?.data ?? [], loading, meta: data?.meta }
}
