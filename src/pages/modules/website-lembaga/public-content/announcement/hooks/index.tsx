import type {
  IAnnouncement,
  IstatusAnnouncement,
} from '@/pages/modules/website-lembaga/public-content/announcement/data'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

interface IAnnouncementListResponse {
  data: IAnnouncement[]
  meta: Meta
}

export const UseGetAnnouncement = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const year = searchParams.get('year') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)
  if (status) ParamsSearch.append('status-publish', status)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<IAnnouncementListResponse>({
    queryKey: ['list-announcement-lembaga', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { announcement: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['detail-announcement-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/pengumuman/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailAnnouncement: data, loading }
}

export const UseGetAnnouncementStatus = () => {
  const { data, isLoading, isFetching } = useQuery<IstatusAnnouncement>({
    queryKey: ['status-announcement-lembaga'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lembaga/pengumuman/status').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export interface ILogAnnouncement {
  id: string
  aktivitas: string
  created_at: string
  created_user: string
  nama_user: string
}

export const UseGetLogAnnouncement = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogAnnouncement[]>({
    queryKey: ['log-announcement-lembaga', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['list-announcement-lembaga-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lembaga/pengumuman/tahun`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
