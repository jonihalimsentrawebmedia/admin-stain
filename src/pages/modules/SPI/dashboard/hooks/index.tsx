import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { TbWorld } from 'react-icons/tb'
import {
  MdAnalytics,
  MdChecklist,
  MdOutlineShowChart,
  MdSettingsBackupRestore,
} from 'react-icons/md'
import { RiBarChart2Fill } from 'react-icons/ri'
import type { IContent, ITotalVisitor, Mode } from '../types'

export const UseGetTotalVisitor = () => {
  const { data: totalVisitor, isFetching, isLoading } = useQuery<ITotalVisitor>({
    queryKey: ['total-visitor-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/dashboard/total-pengunjung').then((res) => res.data?.data),
  })

  const status = useMemo(() => {
    if (!totalVisitor) return []
    return [
      {
        label: 'Total Pengunjung',
        value: totalVisitor?.total_pengunjung,
        icon: (
          <TbWorld
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
      {
        label: 'Hari Ini',
        value: totalVisitor?.hari_ini,
        icon: (
          <MdChecklist
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
      {
        label: 'Kemarin',
        value: totalVisitor?.kemaren,
        icon: (
          <MdSettingsBackupRestore
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
      {
        label: 'Minggu Ini',
        value: totalVisitor?.minggu_ini,
        icon: (
          <RiBarChart2Fill
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
      {
        label: 'Bulan Ini',
        value: totalVisitor?.bulan_ini,
        icon: (
          <MdAnalytics
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
      {
        label: 'Tahun Ini',
        value: totalVisitor?.tahun_ini,
        icon: (
          <MdOutlineShowChart
            className={
              'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
            }
          />
        ),
      },
    ]
  }, [totalVisitor])

  const loading = isLoading || isFetching

  return { totalVisitor, loading, status }
}

export const UseGetApprovedList = (status: string) => {
  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.set('status-publish', status)

  const { data, isLoading, isFetching } = useQuery<IContent[]>({
    queryKey: ['list-approved-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/spi/dashboard/list-konten-pengajuan?${ParamsSearch}`).then(
        (res) => res.data.data
      ),
  })

  const approvedList: IContent[] = data ?? []
  const loading = isLoading || isFetching

  return { approvedList, loading }
}

interface ITrendVisitorData {
  tren_kunjungan: unknown[]
  jenis_pengunjung: { baru: number; kembali: number }
  perangkat: { desktop: number; mobile: number }
}

export const UseGetTrendVisitor = (mode: Mode) => {
  const { data, isLoading, isFetching } = useQuery<ITrendVisitorData>({
    queryKey: ['trent-visitor-spi', mode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/spi/dashboard/statistik-pengunjung/${mode ?? 'harian'}`).then(
        (res) => res.data?.data
      ),
  })

  const trendVisitor = data?.tren_kunjungan
  const visitor = data?.jenis_pengunjung
  const device = data?.perangkat
  const loading = isLoading || isFetching

  return { trendVisitor, loading, visitor, device }
}
