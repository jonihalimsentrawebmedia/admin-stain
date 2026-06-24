import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { IPropsData } from '../data/types'
import type { IApiResponse } from '@/utils/globalType.ts'

export const UseGetAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IAnnouncement[]>>({
    queryKey: ['spi-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const announcement: IAnnouncement[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { announcement, loading, meta }
}

export const UseGetAnnouncementDetail = (id: string) => {
  const { data: detail, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['spi-announcement-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail, loading }
}

export const UseGetAnnouncementStatus = () => {
  const { data: status, isLoading, isFetching } = useQuery<Record<string, number>>({
    queryKey: ['spi-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status, loading }
}

export const UseGetLogAnnouncement = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<unknown[]>({
    queryKey: ['log-spi', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const logData: unknown[] = data ?? []
  const loading = isLoading || isFetching

  return { logData, loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['announcement-spi-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/pengumuman/tahun').then((res) => res.data?.data),
  })

  const year: number[] = data ?? []
  const loading = isLoading || isFetching

  return { year, loading }
}
