import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetGalleryAlbumProdi = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [albumProdi, setAlbumProdi] = useState<IGaleriAlbum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-prodi', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumProdi(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { albumProdi, loading, meta }
}

export const UseGetGalleryAlbumProdiById = (id: string) => {
  const [albumProdi, setAlbumProdi] = useState<IGaleriAlbum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumProdi(data)
    }
  }, [data])

  return { albumProdi, loading }
}

export const UseGetGalleryAlbumProdiLog = (id: string) => {
  const [albumProdiLog, setAlbumProdiLog] = useState<any>()
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-album-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumProdiLog(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { albumProdiLog, loading, meta }
}
