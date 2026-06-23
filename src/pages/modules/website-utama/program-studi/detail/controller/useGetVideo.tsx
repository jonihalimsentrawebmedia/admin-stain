import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetVideo = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const type = searchParams.get('type') ?? ''
  const ParamsSearch = new URLSearchParams({ page, limit, search, type })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-gallery-video', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/galeri-video?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { galleryVideo: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetVideo
