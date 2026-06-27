import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetGalleryVideoUnit = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: IGalleryVideo[]; meta: Meta }>({
    queryKey: ['video-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/galeri-video?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { galleryVideo: data?.data ?? [], loading, meta: data?.meta }
}
