import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export const UseGetFacultyAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{ data: IAnnouncement[]; meta: Meta }>({
    queryKey: ['faculty-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  const announcement = data?.data ?? []
  const meta = data?.meta

  return { announcement, loading, meta }
}

export const UseGetFacultyAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['faculty-announcement-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetFacultyAnnouncementStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['faculty-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAnnouncementFaculty = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-faculty', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['announcement-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/pengumuman/tahun').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
