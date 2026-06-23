import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetNewsProdi = (id: string) => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/berita?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { prodiNews: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDetailNewsProdi = (id: string, detail_id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-news', id, detail_id],
    refetchOnWindowFocus: false,
    enabled: !!id && !!detail_id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/berita/${detail_id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { detailNews: data, loading }
}
