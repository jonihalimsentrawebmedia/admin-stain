import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetNewsProdi = (id: string) => {
  const [prodiNews, setProdiNews] = useState<INewsDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news', id, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/berita?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiNews(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { prodiNews, loading, meta }
}

export const UseGetDetailNewsProdi = (id: string, detail_id: string) => {
  const [detailNews, setDetailNews] = useState<INewsDetail>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-news', id, detail_id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/berita/${detail_id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailNews(data)
    }
  }, [data])

  return { detailNews, loading }
}
