import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IContent, ITotalVisitor, Mode } from '@/pages/modules/website-utama/beranda/types'
import { TbWorld } from 'react-icons/tb'
import {
  MdAnalytics,
  MdChecklist,
  MdOutlineShowChart,
  MdSettingsBackupRestore,
} from 'react-icons/md'
import { RiBarChart2Fill } from 'react-icons/ri'

export const UseGetTotalVisitor = () => {
  const { data, isFetching, isLoading } = useQuery<ITotalVisitor>({
    queryKey: ['total-visitor'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/dashboard/total-pengunjung').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  const status = data
    ? [
        {
          label: 'Total Pengunjung',
          value: data?.total_pengunjung,
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
          value: data?.hari_ini,
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
          value: data?.kemaren,
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
          value: data?.minggu_ini,
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
          value: data?.bulan_ini,
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
          value: data?.tahun_ini,
          icon: (
            <MdOutlineShowChart
              className={
                'absolute right-2 transform text-gray-300/50 -translate-y-1/2 top-1/2 size-16'
              }
            />
          ),
        },
      ]
    : []

  return { totalVisitor: data, loading, status }
}

export const UseGetApprovedList = (status: string) => {
  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.set('status-publish', status)

  const { data, isLoading, isFetching } = useQuery<null | IContent[]>({
    queryKey: ['list-approved', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/dashboard/list-konten-pengajuan?${ParamsSearch}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { approvedList: data ?? [], loading }
}

export const UseGetTrentVisitor = (mode: Mode) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['trent-visitor', mode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/dashboard/statistik-pengunjung/${mode ?? 'harian'}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  const trentVisitor = data?.tren_kunjungan
  const visitor = data
    ? { baru: data.jenis_pengunjung.baru, kembali: data.jenis_pengunjung.kembali }
    : undefined
  const device = data
    ? { desktop: data.perangkat.desktop, mobile: data.perangkat.mobile }
    : undefined

  return { trentVisitor, loading, visitor, device }
}
