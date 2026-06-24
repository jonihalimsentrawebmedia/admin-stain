import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import type { IApiResponse } from '@/utils/globalType.ts'

export const UseGetPulsikomAnnouncement = (props?: IPropsData) => {
  const { page, limit, status_publish, year, search } = props ?? {}

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (year) ParamsSearch.append('tahun', year)
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IAnnouncement[]>>({
    queryKey: ['pusilkom-announcement', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { announcement: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetPulsikomAnnouncementDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IAnnouncement>({
    queryKey: ['pusilkom-announcement-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetPulsikomAnnouncementStatus = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pusilkom-announcement-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/pengumuman/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogAnnouncementPulsikom = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-pusilkom', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/pusilkom/pengumuman-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}

export const UseGetAnnouncementYear = () => {
  const { data, isLoading, isFetching } = useQuery<number[]>({
    queryKey: ['pusilkom-announcement-year'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/pengumuman/tahun').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { year: data ?? [], loading }
}
