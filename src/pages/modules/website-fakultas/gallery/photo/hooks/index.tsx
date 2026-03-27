import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IGaleriPhoto } from '../data/types'

interface props extends BasicProps {
  id_album?: string
}

export const UseGetGalleryPhoto = (props: props) => {
  const { id_album, search, limit, page } = props

  const [photo, setPhoto] = useState<IGaleriPhoto[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit.toString())
  if (page) Params.append('page', page.toString())
  if (id_album) Params.append('id_album', id_album)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['gallery-photo', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-foto?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPhoto(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { photo, loading, meta }
}
