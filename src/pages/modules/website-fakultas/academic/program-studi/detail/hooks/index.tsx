import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFacultyAbout } from '@/pages/modules/website-fakultas/about-faculty/data/type.ts'
import type { IVisionMission } from '@/pages/modules/website-fakultas/academic/program-studi/detail/vision-mission/resolver.tsx'
import type { IOrganization } from '@/pages/modules/website-fakultas/academic/program-studi/detail/organization/resolver.tsx'
import type { IContactUs } from '@/pages/modules/website-fakultas/academic/program-studi/detail/contact-us/resolver.tsx'

export const UseGetProdiAbout = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IFacultyAbout>({
    queryKey: ['prodi-about'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/tentang`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { about: data, loading }
}

export const UseGetProdiVisionMission = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IVisionMission>({
    queryKey: ['prodi-vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/visi-misi`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}

export const UseGetProdiOrganization = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IOrganization>({
    queryKey: ['prodi-organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/struktur-organisasi`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { organization: data, loading }
}

export const UseGetProdiContactUs = (id_unit: string) => {
  const { data, isLoading, isFetching } = useQuery<IContactUs>({
    queryKey: ['prodi-contact-us'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/hubungi-kami`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { contactUs: data, loading }
}
