import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'

export const UseGetNewsProdi = (id: string) => {
  const [prodiNews, setProdiNews] = useState<INewsDetail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-news', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/berita`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiNews(data)
    }
  }, [data])

  return { prodiNews, loading }
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
