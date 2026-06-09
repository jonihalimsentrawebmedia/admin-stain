import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Context {
  context: string
  nama: string
}

export const UseGetContext = (id: string) => {
  const [context, setContext] = useState<Context[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['context'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id}/laporan-kegiatan/contexts`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContext(data?.data ?? [])
    }
  }, [data])

  return { context, loading }
}

interface Props {
  context: string
  id_acara: string
}

export interface IReportActivity {
  id_laporan_kegiatan: number
  id_acara: string
  id_satuan_organisasi: string
  context: string
  laporan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetReportActivityContext = (props: Props) => {
  const { context, id_acara } = props
  const [report, setReport] = useState<IReportActivity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['report-activity-context', context, id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/laporan-kegiatan/context/${context}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReport(data?.data)
    }
  }, [data])

  return { report, loading }
}

export const UseGetReportActivityPrint = (id_acara: string) => {
  const [report, setReport] = useState<IReportActivity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['report-activity-print'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/laporan-kegiatan/print`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReport(data?.data)
    }
  }, [data])

  return { report, loading }
}
