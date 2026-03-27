import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetGalleryAlbum = () => {
  const [album, setAlbum] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-album'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/galeri-album').then((res) => res.data),
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
