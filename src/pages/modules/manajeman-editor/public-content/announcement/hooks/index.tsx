import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export const UseGetManagementEditorAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, id_satuan_organisasi } = props ?? {}
  const [managementEditorAnnouncement, setManagementEditorAnnouncement] = useState<IAnnouncement[]>(
    []
  )
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (id_satuan_organisasi) ParamsSearch.append('id-satuan-organisasi', id_satuan_organisasi)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setManagementEditorAnnouncement(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { managementEditorAnnouncement, loading, meta }
}

export const UseGetManagementEditorAnnouncementDetail = (id: string) => {
  const [managementEditorAnnouncementDetail, setManagementEditorAnnouncementDetail] =
    useState<IAnnouncement>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setManagementEditorAnnouncementDetail(data)
    }
  }, [data])

  return { managementEditorAnnouncementDetail, loading }
}

export const UseGetManagementEditorAnnouncementStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['management-editor-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}

export const UseGetLogAnnouncementManagementEditor = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pengumuman-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
