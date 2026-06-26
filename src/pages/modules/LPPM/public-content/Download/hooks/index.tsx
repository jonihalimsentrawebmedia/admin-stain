import type {
  ICategoryDownload,
  IDownload,
} from '@/pages/modules/website-utama/public-content/download/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  isGetAll?: boolean
}

interface ICategoryDownloadResponse {
  data: ICategoryDownload[]
  meta: Meta
}

interface IDownloadResponse {
  data: IDownload[]
  meta: Meta
}

export const UseGetCategoryDownloadLppm = (props?: Props) => {
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

  const { data, isLoading, isFetching } = useQuery<ICategoryDownloadResponse>({
    queryKey: ['category-download-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/kategori-berkas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { categoryDownload: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDownloadLppm = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (category) ParamsSearch.append('id_kategori_berkas', category)

  const { data, isLoading, isFetching } = useQuery<IDownloadResponse>({
    queryKey: ['download-lppm', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/downloads?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { downloadLppm: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDownloadLppmDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDownload>({
    queryKey: ['download-lppm-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/downloads/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { downloadLppmDetail: data, loading }
}
