import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

interface ILppmAnnouncementResponse {
  data: IAnnouncement[]
  meta: Meta
}

export const UseGetLppmAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, search, year } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search)
  if (year) ParamsSearch.append('tahun', year)

  const { data, isLoading, isFetching } = useQuery<ILppmAnnouncementResponse>({
    queryKey: ['lppm-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { lppmAnnouncement: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetLppmAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['lppm-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { lppmAnnouncementDetail: data, loading }
}

export const UseGetLppmAnnouncementStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['lppm-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAnnouncementLppm = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-pengumuman', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['announcement-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/lppm/pengumuman/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
