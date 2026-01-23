import { useEffect, useState } from 'react'
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

export const UseGetPhotoAlbumUnit = (props?: Props) => {
  const { id_album, page, limit, search } = props ?? {}

  const [photoAlbumUnit, setPhotoAlbumUnit] = useState<IGalleryPhoto[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({
    page: page ?? '1',
    limit: limit ?? '10',
    search: search ?? '',
  })
  if (id_album) ParamsSearch.append('id_album', id_album)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['photo-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-foto?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPhotoAlbumUnit(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { photoAlbumUnit, loading, meta }
}
