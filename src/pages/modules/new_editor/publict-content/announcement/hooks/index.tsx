import { useEffect, useState } from 'react'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

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
