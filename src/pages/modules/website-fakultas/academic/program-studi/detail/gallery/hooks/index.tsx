import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IGaleriAlbum } from '../data/types'

interface AlbumProps extends BasicProps {
  id_unit: string
}

export const UseGetGalleryAlbum = (props: AlbumProps) => {
  const { id_unit, page, limit, search } = props

  const [album, setAlbum] = useState<IGaleriAlbum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-album', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-album?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbum(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { album, loading, meta }
}

interface PhotoProps extends BasicProps {
  id_unit: string
  id_album: string
}
export const UseGetGalleryPhoto = (props: PhotoProps) => {
  const { id_unit, page, limit, search, id_album } = props

  const [photo, setPhoto] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_album) Params.append('id_album', id_album ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-photo', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-foto?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPhoto(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { photo, loading, meta }
}

export const UseGetGalleryVideo = (props: AlbumProps) => {
  const { id_unit, page, limit, search } = props

  const [video, setVideo] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-video', id_unit, Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/galeri-video?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVideo(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { video, loading, meta }
}
