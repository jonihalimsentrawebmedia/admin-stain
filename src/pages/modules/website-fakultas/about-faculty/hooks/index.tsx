import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFacultyAbout } from '../data/type'
import type { IVisionMission } from '@/pages/modules/website-fakultas/about-faculty/vision-mission/resolver.tsx'
import type { IOrganization } from '@/pages/modules/website-fakultas/about-faculty/organization/resolver.tsx'
import type { IContactUs } from '@/pages/modules/website-fakultas/about-faculty/contact-us/resolver.tsx'

export const UseGetFacultyAbout = () => {
  const { data, isLoading, isFetching } = useQuery<IFacultyAbout>({
    queryKey: ['faculty-about'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/tentang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { facultyAbout: data, loading }
}

export const UseGetVisionMission = () => {
  const { data, isLoading, isFetching } = useQuery<IVisionMission>({
    queryKey: ['vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { visionMission: data, loading }
}

export const UseGetFacultyOrganization = () => {
  const { data, isLoading, isFetching } = useQuery<IOrganization>({
    queryKey: ['organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/profil/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { organization: data, loading }
}

export const UseGetContactUs = () => {
  const { data, isLoading, isFetching } = useQuery<IContactUs>({
    queryKey: ['contact-us'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/hubungi-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { contactUs: data, loading }
}
