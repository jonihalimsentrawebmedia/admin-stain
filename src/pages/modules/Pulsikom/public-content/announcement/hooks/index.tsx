import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export const UseGetPulsikomAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}
  const [announcement, setAnnouncement] = useState<IAnnouncement[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman?${ParamsSearch}`).then((res) => res.data),
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

export const UseGetPulsikomAnnouncementDetail = (id: string) => {
  const [detail, setDetail] = useState<IAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetPulsikomAnnouncementStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAnnouncementPulsikom = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pusilkom', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}

export const UseGetAnnouncementYear = () => {
  const [year, setYear] = useState<number[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-announcement-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/pengumuman/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setYear(data)
    }
  }, [data])

  return { year, loading }
}
