import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IContactProgram,
  IInformationProgram,
  IProgramList,
  IRegisterPricing,
  ITopicSchedule,
} from '../data/types'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
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

interface Props extends BasicProps {
  status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
}

export const UseGetListProgram = (props: Props) => {
  const { status, page, limit, search } = props

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IProgramList[]>>({
    queryKey: ['list-program', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listProgram: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetStatusProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<{
    status_pengisian: IstatusTraining
    status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
  }>({
    queryKey: ['status-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetDetailInformationProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IInformationProgram>({
    queryKey: ['detail-information', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/informasi`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetTopicAndScheduleProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IApiResponse<ITopicSchedule[]>>({
    queryKey: ['topic-schedule', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/bahasan-dan-topik`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { topic: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetConditionProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<{ isi: string }>({
    queryKey: ['condition-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/persyaratan`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { condition: data, loading }
}

export const UseGetRegisterPricingProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IRegisterPricing[]>({
    queryKey: ['register-pricing', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/biaya-pendaftaran`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { registerPricing: data ?? [], loading }
}

export const UseGetBankAccountProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IBankAccount[]>({
    queryKey: ['bank-account', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/rekening`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { bankAccount: data ?? [], loading }
}

export const UseGetContactAndMoreNoteProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IContactProgram>({
    queryKey: ['contact-and-more-note', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id}/kontak-dan-catatan-tambahan`).then(
        (res) => res?.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, contact: data }
}

export const UseGetDetailProgram = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<ProgramDetailData>({
    queryKey: ['detail-program', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/program/${id}/detail`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
