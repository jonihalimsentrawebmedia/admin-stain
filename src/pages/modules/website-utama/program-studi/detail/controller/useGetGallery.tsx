import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetGallery = () => {
  const { id } = useParams()
   const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const type = searchParams.get('type') ?? ''
const ParamsSearch = new URLSearchParams({ page, limit, search,type })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-gallery', id, ParamsSearch.toString()],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/galeri-album?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { gallery: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetGallery
