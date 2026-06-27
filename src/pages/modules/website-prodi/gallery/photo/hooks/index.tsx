import type { IGalleryPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  id_album?: string
  page?: string
  limit?: string
  search?: string
}

interface IPhotoResponse {
  data: IGalleryPhoto[]
  meta: Meta
}

export const UseGetPhotoAlbumProdi = (props?: Props) => {
  const { id_album, page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams({
    page: page ?? '1',
    limit: limit ?? '10',
    search: search ?? '',
  })
  if (id_album) ParamsSearch.append('id_album', id_album)

  const { data, isLoading, isFetching } = useQuery<IPhotoResponse>({
    queryKey: ['photo-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-foto?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { photoAlbumProdi: data?.data ?? [], loading, meta: data?.meta }
}
