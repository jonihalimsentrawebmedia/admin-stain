import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDashboardAgenda,
  IDashboardStatistic,
  IDashboardSummary,
} from '@/pages/modules/E-Office/dashboard/data/types.ts'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

export const UseGetDashboardInboxList = () => {
  const [inboxDashboard, setInboxDashboard] = useState<IInboxList[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-inbox'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/list-surat-masuk').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInboxDashboard(data)
    }
  }, [data])

  return { inboxDashboard, loading }
}

export const UseGetDashboardCounts = () => {
  const [counts, setCounts] = useState<IDashboardSummary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-counts'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/jumlah-bulanan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCounts(data)
    }
  }, [data])

  return { counts, loading }
}

export const UseGerUrgentInformation = () => {
  const [urgentInformation, setUrgentInformation] = useState<IDashboardSummary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['urgent-information'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/informasi-penting').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUrgentInformation(data)
    }
  }, [data])

  return { urgentInformation, loading }
}

export const UseGetDashboardAgenda = ({ tanggal_mulai }: { tanggal_mulai: string }) => {
  const [todayAgenda, setTodayAgenda] = useState<IDashboardAgenda[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-statistic-outbox', tanggal_mulai],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/dashboard/agenda?tanggal_mulai=${tanggal_mulai}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTodayAgenda(data)
    }
  }, [data])

  return { todayAgenda, loading }
}

interface Props {
  periode?: 'minggu_ini' | 'bulan_ini' | 'enam_bulan' | 'satu_tahun'
}

export const UseGetStatisticLetterByTime = (props?: Props) => {
  const { periode } = props ?? {}
  const [statisticTime, setStatisticTime] = useState<IDashboardStatistic>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['statistic-time', periode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/dashboard/statistik/waktu?periode=${periode}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatisticTime(data)
    }
  }, [data])

  return { statisticTime, loading }
}
