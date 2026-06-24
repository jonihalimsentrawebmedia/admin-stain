import type {
  ICategoryDownload,
  IDownload,
} from '@/pages/modules/website-utama/public-content/download/types'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IApiResponse } from '@/utils/globalType.ts'

interface Props {
  isGetAll?: boolean
}

export const UseGetCategoryDownloadPulsikom = (props?: Props) => {
  const { isGetAll } = props || {}

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  let ParamsSearch: URLSearchParams

  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '9999' })
    if (search) ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit })
    if (search) ParamsSearch.append('search', search)
  }

  const { data, isLoading, isFetching } = useQuery<IApiResponse<ICategoryDownload[]>>({
    queryKey: ['category-download-pusilkom', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/kategori-berkas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { categoryDownload: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDownloadPulsikom = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (category) ParamsSearch.append('id_kategori_berkas', category)

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IDownload[]>>({
    queryKey: ['download-pusilkom', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/downloads?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { downloadUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDownloadPulsikomDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDownload>({
    queryKey: ['download-pusilkom-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/downloads/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { download: data, loading }
}
