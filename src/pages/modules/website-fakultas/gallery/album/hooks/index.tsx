import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetGalleryAlbum = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [album, setAlbum] = useState<[]>([])
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
