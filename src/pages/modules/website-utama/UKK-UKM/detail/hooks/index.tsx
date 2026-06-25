import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAboutUkkUkm, IContactUkkUkm } from './types.ts'

export const UseGetAboutUkkUkm = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IAboutUkkUkm>({
    queryKey: ['about-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-tentang/${id_unit}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { about: data, loading }
}

export const UseGetVisionMissionUkkUkm = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    visi: string
    misi: string
    tujuan: string
  }>({
    queryKey: ['vision-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-visi-misi/${id_unit}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}

export const UseGetStructureUkkUkm = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<{ url_gambar: string }>({
    queryKey: ['structure-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-struktur-organisasi/${id_unit}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { structure: data, loading }
}

export const UseGetContactUkkUkm = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IContactUkkUkm>({
    queryKey: ['contact-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-hubungi-kami/${id_unit}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { contact: data, loading }
}
