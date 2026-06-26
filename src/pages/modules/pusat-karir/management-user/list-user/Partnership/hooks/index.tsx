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
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetDetailStatusForm = (id_temp?: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: ICompanyProfile; step: IWorkPartnerStep }>({
    queryKey: ['detail-status-form', id_temp],
    enabled: !!id_temp,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/mitra-kerja-tmp/${id_temp}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { detail: data?.data, loading, status: data?.step }
}

export const UseGetPartnership = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IPartnership[]; meta: Meta }>({
    queryKey: ['partnership', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { partnership: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetPartnershipDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-partnership', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusat-karir/mitra-kerja/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetCompanyInformation = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICompanyInformation>({
    queryKey: ['company-information', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/informasi-perusahaan`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { information: data, loading }
}

export const UseGetCompanyContact = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICompanyContact>({
    queryKey: ['company-contact', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/informasi-kontak`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { contact: data, loading }
}

export const UseGetCompanyBranding = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICompanyBranding>({
    queryKey: ['company-branding', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/branding`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { branding: data, loading }
}

export const UseGetCompanyLegality = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICompanyLegality>({
    queryKey: ['company-legality', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/legalitas`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { legality: data, loading }
}

export const UseGetCompanyMediaSocial = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ICompanySocialMedia>({
    queryKey: ['company-media-social', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/media-social`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { mediaSocial: data, loading }
}

export const UseGetStatusStep = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<StepStatus>({
    queryKey: ['status-step', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/mitra-kerja/${id}/profile/step`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}
