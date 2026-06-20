import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IGaleriAlbum } from '../data/types.ts'

export const UseGetGalleryAlbum = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [album, setAlbum] = useState<IGaleriAlbum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-album', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-album?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbum(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { album, loading, meta }
}

export const UseGetGalleryAlbumDetail = (id_album: string) => {
  const [albumDetail, setAlbumDetail] = useState<IGaleriAlbum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-album-detail', id_album],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-album/${id_album}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumDetail(data?.data)
    }
  }, [data])

  return { albumDetail, loading }
}
