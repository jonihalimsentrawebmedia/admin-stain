import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAboutUnitInstitution, IContactUnitInstitution } from './types.ts'

export const UseGetAboutUnitInstitution = (id_unit: string) => {
  const [about, setAbout] = useState<IAboutUnitInstitution>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/tentang`).then(
        (res) => res.data.data
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

export const UseGetVisionMissionUnitInstitution = (id_unit: string) => {
  const [visionMission, setVisionMission] = useState<{
    visi: string
    misi: string
    tujuan: string
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['vision-mission-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/visi-misi`).then(
        (res) => res.data.data
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

export const UseGetStructureUnitInstitution = (id_unit: string) => {
  const [structure, setStructure] = useState<{ url_gambar: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['structure-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/struktur-organisasi`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStructure(data)
    }
  }, [data])

  return { structure, loading }
}

export const UseGetContactUnitInstitution = (id_unit: string) => {
  const [contact, setContact] = useState<IContactUnitInstitution>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-unit-institution', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id_unit}/hubungi-kami`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContact(data)
    }
  }, [data])

  return { contact, loading }
}
