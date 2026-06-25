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

export const UseGetCategoryDownloadFaculty = (props?: Props) => {
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

  const { data, isLoading, isFetching } = useQuery<{ data: ICategoryDownload[]; meta: Meta }>({
    queryKey: ['category-download-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/kategori-berkas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  const categoryDownload = data?.data ?? []
  const meta = data?.meta

  return { categoryDownload, loading, meta }
}

export const UseGetDownloadFaculty = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (category) ParamsSearch.append('id_kategori_berkas', category)

  const { data, isLoading, isFetching } = useQuery<{ data: IDownload[]; meta: Meta }>({
    queryKey: ['download-faculty', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/downloads?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  const downloadUnit = data?.data ?? []
  const meta = data?.meta

  return { downloadUnit, loading, meta }
}

export const UseGetDownloadFacultyDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDownload>({
    queryKey: ['download-faculty-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/downloads/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { downloadProdiDetail: data, loading }
}
