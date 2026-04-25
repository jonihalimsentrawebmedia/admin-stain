import { useEffect, useState } from 'react'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetAgendaManagementEditorDetail = (id: string) => {
  const [agendaManagementEditorDetail, setAgendaManagementEditorDetail] = useState<IAgendaDetail>()
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-management-editor-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/agenda/${id}`).then((res) => res.data?.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setAgendaManagementEditorDetail(data)
    }
  }, [data])
  
  return { agendaManagementEditorDetail, loading }
}

export const UseGetLogAgendaManagementEditor = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-agenda', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/agenda-log/${id}`).then((res) => res.data.data),
  })
  
  const loading = isLoading || isFetching
  
  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])
  
  return { logData, loading }
}