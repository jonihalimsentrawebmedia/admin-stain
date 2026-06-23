import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAgendaManagementEditorDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAgendaDetail>({
    queryKey: ['agenda-management-editor-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/agenda/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { agendaManagementEditorDetail: data, loading }
}

export const UseGetLogAgendaManagementEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/agenda-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
