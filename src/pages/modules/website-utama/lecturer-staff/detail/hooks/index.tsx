import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
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

  const [formalEducation, setFormalEducation] = useState<IFormalEducation[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['formal-education'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/pendidikan-formal`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFormalEducation(data?.data)
    }
  }, [data])

  return { loading, formalEducation }
}
export const UseGetRank = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [rank, setRank] = useState<IRank[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['rank'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/kepangkatan`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRank(data?.data)
    }
  }, [data])

  return { loading, rank }
}
export const UseGetFunctionalPosition = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [functionalPosition, setFunctionalPosition] = useState<IFunctionalPosition[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['function-position'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/jabatan-fungsional`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFunctionalPosition(data?.data)
    }
  }, [data])

  return { loading, functionalPosition }
}
export const UseGetHKI = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [HKI, setHKI] = useState<IHKI[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['hki-paten'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/hki-paten`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHKI(data?.data)
    }
  }, [data])

  return { loading, HKI }
}
export const UseGetReseacrh = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [research, setResearch] = useState<IResearch[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['research'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/penelitian`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setResearch(data?.data)
    }
  }, [data])

  return { loading, research }
}
export const UseGetPublication = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [publication, setPublication] = useState<IPublication[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['publication'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/publikasi`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPublication(data?.data)
    }
  }, [data])

  return { loading, publication }
}
export const UseGetDevotion = (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [devotion, setDevotion] = useState<IDevotion[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`devotion`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/sdm/${id_sdm}/pengabdian`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDevotion(data?.data)
    }
  }, [data])

  return { loading, devotion }
}
export const UseGetSyncStatus = (props?: SyncProps) => {
  const { link } = props ?? {}

  const [status, setStatus] = useState<ISyncStatus[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`sync-status`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(link ?? '').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data?.data)
    }
  }, [data])

  return { loading, status }
}
