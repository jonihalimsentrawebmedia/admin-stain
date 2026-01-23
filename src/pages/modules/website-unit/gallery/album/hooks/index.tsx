import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGaleriAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data'

export const UseGetGalleryAlbumUnit = () => {
  const [albumUnit, setAlbumUnit] = useState<IGaleriAlbum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumUnit(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { albumUnit, loading, meta }
}

export const UseGetGalleryAlbumUnitById = (id: string) => {
  const [albumUnitDetail, setAlbumUnitDetail] = useState<IGaleriAlbum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumUnitDetail(data)
    }
  }, [data])

  return { albumUnitDetail, loading }
}

export const UseGetGalleryAlbumUnitLog = (id: string) => {
  const [albumUnitLog, setAlbumUnitLog] = useState<any>()
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['album-unit-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-album-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAlbumUnitLog(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { albumUnitLog, loading, meta }
}
