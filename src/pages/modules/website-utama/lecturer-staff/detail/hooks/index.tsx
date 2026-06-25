import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import type { IApiResponse } from '@/utils/globalType'
import type {
  IDevotion,
  IFormalEducation,
  IFunctionalPosition,
  IHKI,
  IPublication,
  IRank,
  IResearch,
  ISyncStatus,
} from '../data/types'

interface Props {
  id_sdm?: string
}
interface SyncProps {
  link: string
}

export const UseGetFormalEducation = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IFormalEducation[]>>({
    queryKey: ['formal-education'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/pendidikan-formal`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, formalEducation: data?.data ?? [] }
}
export const UseGetRank = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IRank[]>>({
    queryKey: ['rank'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/kepangkatan`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, rank: data?.data ?? [] }
}
export const UseGetFunctionalPosition = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IFunctionalPosition[]>>({
    queryKey: ['function-position'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/jabatan-fungsional`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, functionalPosition: data?.data ?? [] }
}
export const UseGetHKI = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IHKI[]>>({
    queryKey: ['hki-paten'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/hki-paten`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, HKI: data?.data ?? [] }
}
export const UseGetReseacrh = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IResearch[]>>({
    queryKey: ['research'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/penelitian`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, research: data?.data ?? [] }
}
export const UseGetPublication = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IPublication[]>>({
    queryKey: ['publication'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/publikasi`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, publication: data?.data ?? [] }
}
export const UseGetDevotion = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IDevotion[]>>({
    queryKey: [`devotion`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/pengabdian`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, devotion: data?.data ?? [] }
}
export const UseGetSyncStatus = (props?: SyncProps) => {
  const { link } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<IApiResponse<ISyncStatus[]>>({
    queryKey: [`sync-status`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(link ?? '').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, status: data?.data ?? [] }
}
