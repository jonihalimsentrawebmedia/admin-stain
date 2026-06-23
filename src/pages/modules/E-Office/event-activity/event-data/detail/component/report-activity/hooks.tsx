import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { PrintAllActivity } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/report-activity/data/types.ts'

interface Context {
  context: string
  nama: string
}

export const UseGetContext = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: Context[] }>({
    queryKey: ['context', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id}/laporan-kegiatan/contexts`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { context: data?.data ?? [], loading }
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
  const { data, isLoading, isFetching } = useQuery<{ data: IReportActivity }>({
    queryKey: ['report-activity-context', context, id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/laporan-kegiatan/context/${context}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { report: data?.data, loading }
}

export const UseGetReportActivityPrint = (id_acara: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: PrintAllActivity }>({
    queryKey: ['report-activity-print', id_acara],
    refetchOnWindowFocus: false,
    enabled: !!id_acara,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/laporan-kegiatan/print`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { report: data?.data, loading }
}
