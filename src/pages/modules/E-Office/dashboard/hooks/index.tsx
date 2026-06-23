import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDashboardAgenda,
  IDashboardStatistic,
  IDashboardSummary,
} from '@/pages/modules/E-Office/dashboard/data/types.ts'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

export const UseGetDashboardInboxList = () => {
  const { data, isLoading, isFetching } = useQuery<IInboxList[]>({
    queryKey: ['dashboard-inbox'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/list-surat-masuk').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { inboxDashboard: data ?? [], loading }
}

export const UseGetDashboardCounts = () => {
  const { data, isLoading, isFetching } = useQuery<IDashboardSummary>({
    queryKey: ['dashboard-counts'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/jumlah-bulanan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { counts: data, loading }
}

export const UseGetUrgentInformation = () => {
  const { data, isLoading, isFetching } = useQuery<IDashboardSummary>({
    queryKey: ['urgent-information'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/informasi-penting').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { urgentInformation: data, loading }
}

export const UseGetDashboardAgenda = ({ tanggal_mulai }: { tanggal_mulai: string }) => {
  const { data, isLoading, isFetching } = useQuery<IDashboardAgenda[]>({
    queryKey: ['dashboard-statistic-outbox', tanggal_mulai],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/dashboard/agenda?tanggal_mulai=${tanggal_mulai}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { todayAgenda: data ?? [], loading }
}

interface Props {
  periode?: 'minggu_ini' | 'bulan_ini' | 'enam_bulan' | 'satu_tahun'
}

export const UseGetStatisticLetterByTime = (props?: Props) => {
  const { periode } = props ?? {}
  const { data, isLoading, isFetching } = useQuery<IDashboardStatistic>({
    queryKey: ['statistic-time', periode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/dashboard/statistik/waktu?periode=${periode}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { statisticTime: data, loading }
}
