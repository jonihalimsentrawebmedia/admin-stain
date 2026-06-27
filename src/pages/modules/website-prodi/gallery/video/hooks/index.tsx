import type { IGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IVideoResponse {
  data: IGalleryVideo[]
  meta: Meta
}

interface IVideoLog {
  id: string
  [key: string]: unknown
}

export const UseGetGalleryVideoProdi = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IVideoResponse>({
    queryKey: ['video-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-video?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { galleryVideo: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetGalleryVideoProdiById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGalleryVideo>({
    queryKey: ['video-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-video/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detailGalleryVideo: data, loading }
}

export const UseGetGalleryVideoProdiLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IVideoLog[]; meta: Meta }>({
    queryKey: ['video-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/galeri-video-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { videoProdiLog: data?.data ?? [], loading, meta: data?.meta }
}
