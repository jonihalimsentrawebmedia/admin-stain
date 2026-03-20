import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export const UseGetFacultyAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish } = props ?? {}
  const [announcement, setAnnouncement] = useState<IAnnouncement[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAnnouncement(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { announcement, loading, meta }
}

export const UseGetFacultyAnnouncementDetail = (id: string) => {
  const [detail, setDetail] = useState<IAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetFacultyAnnouncementStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAnnouncementFaculty = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-faculty', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
