import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IChartLetterNature,
  IDashboardCount,
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
  const [counts, setCounts] = useState<IDashboardCount>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-counts'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/dashboard/counts').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCounts(data)
    }
  }, [data])

  return { counts, loading }
}

export const UseGetStatisticInbox = () => {
  const [statisticInbox, setStatisticInbox] = useState<IChartLetterNature[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-statistic-inbox'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/statistik/sifat/surat-masuk').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatisticInbox(data)
    }
  }, [data])

  return { statisticInbox, loading }
}

export const UseGetStatisticOutbox = () => {
  const [statisticOutbox, setStatisticOutbox] = useState<IChartLetterNature[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['dashboard-statistic-outbox'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/dashboard/statistik/sifat/surat-keluar').then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatisticOutbox(data)
    }
  }, [data])

  return { statisticOutbox, loading }
}
