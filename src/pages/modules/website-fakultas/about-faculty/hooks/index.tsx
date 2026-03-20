import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IFacultyAbout } from '../data/type'
import type { IVisionMission } from '@/pages/modules/website-fakultas/about-faculty/vision-mission/resolver.tsx'
import type { IOrganization } from '@/pages/modules/website-fakultas/about-faculty/organization/resolver.tsx'
import type { IContactUs } from '@/pages/modules/website-fakultas/about-faculty/contact-us/resolver.tsx'

export const UseGetFacultyAbout = () => {
  const [facultyAbout, setFacultyAbout] = useState<IFacultyAbout>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['faculty-about'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/tentang').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFacultyAbout(data)
    }
  }, [data])

  return { facultyAbout, loading }
}

export const UseGetVisionMission = () => {
  const [visionMission, setVisionMission] = useState<IVisionMission>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/visi-misi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}

export const UseGetFacultyOrganization = () => {
  const [organization, setOrganization] = useState<IOrganization>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/profil/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOrganization(data)
    }
  }, [data])

  return { organization, loading }
}

export const UseGetContactUs = () => {
  const [contactUs, setContactUs] = useState<IContactUs>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-us'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/profil/hubungi-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContactUs(data)
    }
  }, [data])

  return { contactUs, loading }
}
