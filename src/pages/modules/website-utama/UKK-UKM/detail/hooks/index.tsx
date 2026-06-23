import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAboutUkkUkm, IContactUkkUkm } from './types.ts'

export const UseGetAboutUkkUkm = (id_unit: string) => {
  const [about, setAbout] = useState<IAboutUkkUkm>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-tentang/${id_unit}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAbout(data)
    }
  }, [data])

  return { about, loading }
}

export const UseGetVisionMissionUkkUkm = (id_unit: string) => {
  const [visionMission, setVisionMission] = useState<{
    visi: string
    misi: string
    tujuan: string
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['vision-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-visi-misi/${id_unit}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisionMission(data)
    }
  }, [data])

  return { visionMission, loading }
}

export const UseGetStructureUkkUkm = (id_unit: string) => {
  const [structure, setStructure] = useState<{ url_gambar: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['structure-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-struktur-organisasi//${id_unit}`).then(
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

export const UseGetContactUkkUkm = (id_unit: string) => {
  const [contact, setContact] = useState<IContactUkkUkm>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-ukk-ukm', id_unit],
    refetchOnWindowFocus: false,
    enabled: !!id_unit,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-hubungi-kami/${id_unit}`).then(
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
