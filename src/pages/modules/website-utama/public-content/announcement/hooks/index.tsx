import { useEffect, useState } from 'react'
import type {
  IAnnouncement,
  IstatusAnnouncement,
} from '@/pages/modules/website-utama/public-content/announcement/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetAnnouncement = () => {
  const [announcement, setAnnouncement] = useState<IAnnouncement[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAnnouncement(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { announcement, loading, meta }
}

export const UseGetAnnouncementDetail = (id: string) => {
  const [detailAnnouncement, setDetailAnnouncement] = useState<IAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-announcement', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/pengumuman/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailAnnouncement(data)
    }
  }, [data])

  return { detailAnnouncement, loading }
}

export const UseGetAnnouncementStatus = () => {
  const [status, setStatus] = useState<IstatusAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-announcement'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/pengumuman/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}
