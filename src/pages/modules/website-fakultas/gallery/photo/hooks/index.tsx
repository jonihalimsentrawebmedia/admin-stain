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

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit.toString())
  if (page) Params.append('page', page.toString())
  if (id_album) Params.append('id_album', id_album)

  const { data, isLoading, isFetching } = useQuery<{ data: IGaleriPhoto[]; meta: Meta }>({
    queryKey: ['gallery-photo', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/galeri-foto?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { photo: data?.data ?? [], loading, meta: data?.meta }
}
