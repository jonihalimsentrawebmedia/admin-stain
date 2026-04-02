import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IContactProgram,
  IInformationProgram,
  IProgramList,
  IRegisterPricing,
  ITopicSchedule,
} from '../data/types'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'
import type { ProgramDetailData } from '@/pages/modules/Pulsikom/training/credit-earning/Program/data/fullDetail.ts'

export interface IstatusTraining {
  is_informasi_pendaftaran: boolean
  is_topik_bahasan_jadwal: boolean
  is_persyaratan: boolean
  is_biaya_pendaftaran: boolean
  is_rekening_penerimaan: boolean
  is_kontak_catatan_tambahan: boolean
}

interface Props {
  status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
}

export const UseGetListProgram = (props: Props) => {
  const { status } = props

  const [listProgram, setListProgram] = useState<IProgramList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-program', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setListProgram(data?.data)
    }
  }, [data])

  return { listProgram, meta, loading }
}

export const UseGetStatusProgram = (id?: string | null) => {
  const [detail, setDetail] = useState<{
    status_pengisian: IstatusTraining
    status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      console.log(data)
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetDetailInformationProgram = (id?: string | null) => {
  const [detail, setDetail] = useState<IInformationProgram>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-information', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/informasi`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}

export const UseGetTopicAndScheduleProgram = (id?: string | null) => {
  const [topic, setTopic] = useState<ITopicSchedule[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['topic-schedule', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/bahasan-dan-topik`).then((res) => res.data),
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

export const UseGetConditionProgram = (id?: string | null) => {
  const [condition, setCondition] = useState<{ isi: string }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['condition-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/persyaratan`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCondition(data)
    }
  }, [data])

  return { condition, loading }
}

export const UseGetRegisterPricingProgram = (id?: string | null) => {
  const [registerPricing, setRegisterPricing] = useState<IRegisterPricing[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-pricing', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/biaya-pendaftaran`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegisterPricing(data)
    }
  }, [data])

  return { registerPricing, loading }
}

export const UseGetBankAccountProgram = (id?: string | null) => {
  const [bankAccount, setBankAccount] = useState<IBankAccount[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bank-account', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/rekening`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBankAccount(data)
    }
  }, [data])

  return { bankAccount, loading }
}

export const UseGetContactAndMoreNoteProgram = (id?: string | null) => {
  const [contact, setContact] = useState<IContactProgram>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-and-more-note', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/kontak-dan-catatan-tambahan`).then(
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

export const UseGetDetailProgram = (id?: string | null) => {
  const [detail, setDetail] = useState<ProgramDetailData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program/${id}/detail`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
