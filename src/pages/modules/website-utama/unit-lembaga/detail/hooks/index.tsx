import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAboutUnitInstitution, IContactUnitInstitution } from './types.ts'

export const UseGetAboutUnitInstitution = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IAboutUnitInstitution>({
    queryKey: ['about-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/tentang`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { about: data, loading }
}

export const UseGetVisionMissionUnitInstitution = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    visi: string
    misi: string
    tujuan: string
  }>({
    queryKey: ['vision-mission-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/visi-misi`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}

export const UseGetStructureUnitInstitution = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<{ url_gambar: string }>({
    queryKey: ['structure-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/struktur-organisasi`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { structure: data, loading }
}

export const UseGetContactUnitInstitution = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IContactUnitInstitution>({
    queryKey: ['contact-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/hubungi-kami`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { contact: data, loading }
}
