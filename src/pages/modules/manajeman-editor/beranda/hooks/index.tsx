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
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface statusTotal {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  PROSES_EDITOR: number
  TOLAK_EDITOR: number
}

interface PropsMeta {
  status: string
  page?: string
  limit?: string
  search?: string
}

interface ITrentResponse {
  tren_kunjungan: any
  jenis_pengunjung: { baru: number; kembali: number }
  perangkat: { desktop: number; mobile: number }
}

export const UseGetTotalVisitorEditor = () => {
  const { data, isFetching, isLoading } = useQuery<ITotalVisitor>({
    queryKey: ['total-visitor'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/editor/dashboard/total-pengunjung').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return {
    totalVisitor: data,
    loading,
    status: data
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
      : [],
  }
}

export const UseGetApprovedListEditor = (props?: PropsMeta) => {
  const { status, page, limit } = props ?? {}
  // const [approvedList, setApprovedList] = useState<IContent[]>([])
  // const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.set('status-publish', status)
  if (page) ParamsSearch.set('page', page ?? '1')
  if (limit) ParamsSearch.set('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<null | { data: IContent[]; meta: Meta }>({
    queryKey: ['list-approved', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/dashboard/list-konten-pengajuan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  // useEffect(() => {
  //   if (data) {
  //     setApprovedList(data?.data)
  //     setMeta(data?.meta)
  //   } else {
  //     setApprovedList([])
  //   }
  // }, [data])

  return { approvedList: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetApprovedListEditorStatus = () => {
  const { data, isLoading, isFetching } = useQuery<statusTotal>({
    queryKey: ['list-approved-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/editor/dashboard/konten-yang-diajukan').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetTrentVisitorEditor = (mode: Mode) => {
  const { data, isLoading, isFetching } = useQuery<ITrentResponse>({
    queryKey: ['trent-visitor', mode],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/editor/dashboard/statistik-pengunjung/${mode ?? 'harian'}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    trentVisitor: data?.tren_kunjungan,
    loading,
    visitor: data?.jenis_pengunjung,
    device: data?.perangkat,
  }
}
