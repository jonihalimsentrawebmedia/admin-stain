import { useEffect, useState } from 'react'
import type { IAgendaDetail } from '@/pages/modules/website-utama/public-content/agenda/data'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'

export const UseGetAgendaManagementEditor = (props: IPropsData) => {
  const { page, limit, status_publish, id_satuan_organisasi } = props
  const [agendaManagementEditor, setAgendaManagementEditor] = useState<IAgendaDetail[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (id_satuan_organisasi) ParamsSearch.append('id-satuan-organisasi', id_satuan_organisasi)
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-management-editor', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/agenda?${ParamsSearch}`).then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setAgendaManagementEditor(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { agendaManagementEditor, loading, meta }
}

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

export const UseGetAgendaManagementEditorStatus = () => {
  const [status, setStatus] = useState<INewsStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['agenda-management-editor-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/editor/agenda/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
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
