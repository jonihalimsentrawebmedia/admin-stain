import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetManagementEditorAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['management-editor-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { managementEditorAnnouncementDetail: data, loading }
}

export const UseGetLogAnnouncementManagementEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-pengumuman-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
