import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInformationTraining, IRegisterPricing, ITopicSchedule } from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface IstatusTraining {
  is_informasi_pendaftaran: boolean
  is_topik_bahasan_jadwal: boolean
  is_persyaratan: boolean
  is_biaya_pendaftaran: boolean
  is_rekening_penerimaan: boolean
  is_kontak_catatan_tambahan: boolean
}

export const UseGetStatusTraining = (id?: string | null) => {
  const [detail, setDetail] = useState<{
    status_pengisian: IstatusTraining
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetDetailInformation = (id?: string | null) => {
  const [detail, setDetail] = useState<IInformationTraining>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-information', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/informasi`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetTopicAndSchedule = (id?: string | null) => {
  const [topic, setTopic] = useState<ITopicSchedule[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['topic-schedule', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/bahasan-dan-topik`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setTopic(data?.data)
    }
  }, [data])

  return { topic, meta, loading }
}

export const UseGetConditionTraining = (id?: string | null) => {
  const [condition, setCondition] = useState<{ isi: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['condition-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/persyaratan`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCondition(data)
    }
  }, [data])

  return { condition, loading }
}

export const UseGetRegisterPricing = (id?: string | null) => {
  const [registerPricing, setRegisterPricing] = useState<IRegisterPricing[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-pricing', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/biaya-pendaftaran`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegisterPricing(data)
    }
  }, [data])

  return { registerPricing, loading }
}

export const UseGetBankAccount = (id?: string | null) => {
  const [bankAccount, setBankAccount] = useState<[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bank-account', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/rekening`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBankAccount(data)
    }
  }, [data])

  return { bankAccount, loading }
}
