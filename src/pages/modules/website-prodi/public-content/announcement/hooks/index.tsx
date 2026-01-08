import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export const UseGetProdiAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}
  const [prodiAnnouncement, setProdiAnnouncement] = useState<IAnnouncement[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiAnnouncement(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { prodiAnnouncement, loading, meta }
}

export const UseGetProdiAnnouncementDetail = (id: string) => {
  const [prodiAnnouncementDetail, setProdiAnnouncementDetail] = useState<IAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProdiAnnouncementDetail(data)
    }
  }, [data])

  return { prodiAnnouncementDetail, loading }
}

export const UseGetProdiAnnouncementStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAnnouncementProdi = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pengumuman', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
