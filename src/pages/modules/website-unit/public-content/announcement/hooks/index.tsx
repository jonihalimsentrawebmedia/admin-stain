import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-unit/public-content/news/data/types.ts'
interface ILogAnnouncement {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetUnitAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, search, year } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search ?? '')
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<{ data: IAnnouncement[]; meta: Meta }>({
    queryKey: ['unit-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { unitAnnouncement: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetUnitAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['unit-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { unitAnnouncementDetail: data, loading }
}

export const UseGetUnitAnnouncementStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['unit-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAnnouncementUnit = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogAnnouncement[]>({
    queryKey: ['log-unit-pengumuman', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['announcement-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/pengumuman/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
