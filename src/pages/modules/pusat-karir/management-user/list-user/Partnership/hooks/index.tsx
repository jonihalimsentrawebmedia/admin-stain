import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  ICompanyBranding,
  ICompanyContact,
  ICompanyInformation,
  ICompanyLegality,
  ICompanyProfile,
  ICompanySocialMedia,
  IPartnership,
  IWorkPartnerStep,
  StepStatus,
} from '../data/types'

export const UseGetDetailStatusForm = (id_temp?: string) => {
  const [detail, setDetail] = useState<ICompanyProfile>()
  const [status, setStatus] = useState<IWorkPartnerStep>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-status-form', id_temp],
    enabled: !!id_temp,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/mitra-kerja-tmp/${id_temp}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data?.data)
      setStatus(data?.step)
    }
  }, [data])

  return { detail, loading, status }
}

export const UseGetPartnership = () => {
  const [partnership, setPartnership] = useState<IPartnership[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['partnership'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/mitra-kerja').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPartnership(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { partnership, meta, loading }
}

export const UseGetPartnershipDetail = (id: string) => {
  const [detail, setDetail] = useState()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-partnership', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/mitra-kerja/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetCompanyInformation = (id: string) => {
  const [information, setInformation] = useState<ICompanyInformation>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-information', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/informasi-perusahaan`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInformation(data)
    }
  }, [data])

  return { information, loading }
}

export const UseGetCompanyContact = (id: string) => {
  const [contact, setContact] = useState<ICompanyContact>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-contact', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/informasi-kontak`).then(
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

export const UseGetCompanyBranding = (id: string) => {
  const [branding, setBranding] = useState<ICompanyBranding>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-branding', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/branding`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBranding(data)
    }
  }, [data])

  return { branding, loading }
}

export const UseGetCompanyLegality = (id: string) => {
  const [legality, setLegality] = useState<ICompanyLegality>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-legality', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/legalitas`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLegality(data)
    }
  }, [data])

  return { legality, loading }
}

export const UseGetCompanyMediaSocial = (id: string) => {
  const [mediaSocial, setMediaSocial] = useState<ICompanySocialMedia>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-media-social', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/media-social`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMediaSocial(data)
    }
  }, [data])

  return { mediaSocial, loading }
}

export const UseGetStatusStep = (id: string) => {
  const [status, setStatus] = useState<StepStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-step', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/step`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data)
    }
  }, [data])

  return { status, loading }
}
