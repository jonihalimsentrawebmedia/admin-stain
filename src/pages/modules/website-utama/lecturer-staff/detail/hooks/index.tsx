import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { IFormalEducation, IFunctionalPosition, IRank, IResearch } from '../data/types'

interface Props {
  id_sdm?: string
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
export const UseGetFunctionalPosition= (props?: Props) => {
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
export const UseGetHKI= (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [HKI, setHKI] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [id_sdm],
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
export const UseGetReseacrh= (props?: Props) => {
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
export const UseGetPublication= (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [publication, setPublication] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [id_sdm],
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
export const UseGetDevotion= (props?: Props) => {
  const { id_sdm } = props ?? {}

  const [devotion, setDevotion] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [id_sdm],
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
