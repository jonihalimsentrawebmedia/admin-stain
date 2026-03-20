import { useEffect, useState } from 'react'
import type { IFacultyAbout } from '@/pages/modules/website-fakultas/about-faculty/data/type.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IVisionMission } from '@/pages/modules/website-fakultas/academic/program-studi/detail/vision-mission/resolver.tsx'
import type { IOrganization } from '@/pages/modules/website-fakultas/academic/program-studi/detail/organization/resolver.tsx'
import type { IContactUs } from '@/pages/modules/website-fakultas/academic/program-studi/detail/contact-us/resolver.tsx'

export const UseGetProdiAbout = (id_unit: string) => {
  const [about, setAbout] = useState<IFacultyAbout>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-about'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/tentang`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAbout(data)
    }
  }, [data])

  return { about, loading }
}

export const UseGetProdiVisionMission = (id_unit: string) => {
  const [visionMission, setVisionMission] = useState<IVisionMission>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-vision-mission'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/visi-misi`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}

export const UseGetProdiOrganization = (id_unit: string) => {
  const [organization, setOrganization] = useState<IOrganization>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/struktur-organisasi`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOrganization(data)
    }
  }, [data])

  return { organization, loading }
}

export const UseGetProdiContactUs = (id_unit: string) => {
  const [contactUs, setContactUs] = useState<IContactUs>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-contact-us'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/hubungi-kami`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContactUs(data)
    }
  }, [data])

  return { contactUs, loading }
}
