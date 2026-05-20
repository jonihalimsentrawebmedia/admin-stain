import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IContactTraining,
  IInformationTraining,
  IRegisterPricing,
  ITopicSchedule,
  ITrainingList,
} from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'
import type { TrainingDetailData } from '@/pages/modules/Pulsikom/training/list-training/data/fullDetail.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export interface IstatusTraining {
  is_informasi_pendaftaran: boolean
  is_topik_bahasan_jadwal: boolean
  is_persyaratan: boolean
  is_biaya_pendaftaran: boolean
  is_rekening_penerimaan: boolean
  is_kontak_catatan_tambahan: boolean
}

interface Props extends BasicProps {
  status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
}

export const UseGetListTraining = (props: Props) => {
  const { status, search, page, limit } = props

  const [listTraining, setListTraining] = useState<ITrainingList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-training', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setListTraining(data?.data)
    }
  }, [data])

  return { listTraining, meta, loading }
}

export const UseGetStatusTraining = (id?: string | null) => {
  const [detail, setDetail] = useState<{
    status_pengisian: IstatusTraining
    status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
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
  const [bankAccount, setBankAccount] = useState<IBankAccount[]>([])

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

export const UseGetContactAndMoreNote = (id?: string | null) => {
  const [contact, setContact] = useState<IContactTraining>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-and-more-note', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/kontak-dan-catatan-tambahan`).then(
        (res) => res?.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContact(data)
    }
  }, [data])

  return { loading, contact }
}

export const UseGetDetailTraining = (id?: string | null) => {
  const [detail, setDetail] = useState<TrainingDetailData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/${id}/detail`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
