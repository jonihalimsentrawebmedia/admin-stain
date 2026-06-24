import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import type { TrainingDetailData } from '@/pages/modules/Pulsikom/training/list-training/data/fullDetail.ts'
import type {
  IContactTraining,
  IInformationTraining,
  IRegisterPricing,
  ITopicSchedule,
  ITrainingList,
} from '../data/types'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'

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

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<ITrainingList>>({
    queryKey: ['list-training', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listTraining: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetStatusTraining = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<{
    status_pengisian: IstatusTraining
    status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
  }>({
    queryKey: ['status-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetDetailInformation = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IInformationTraining>({
    queryKey: ['detail-information', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/informasi`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetTopicAndSchedule = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IApiResponse<ITopicSchedule[]>>({
    queryKey: ['topic-schedule', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/bahasan-dan-topik`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { topic: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetConditionTraining = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['condition-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/persyaratan`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { condition: data, loading }
}

export const UseGetRegisterPricing = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IRegisterPricing[]>({
    queryKey: ['register-pricing', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/biaya-pendaftaran`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { registerPricing: data ?? [], loading }
}

export const UseGetBankAccount = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IBankAccount[]>({
    queryKey: ['bank-account', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/rekening`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { bankAccount: data ?? [], loading }
}

export const UseGetContactAndMoreNote = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<IContactTraining>({
    queryKey: ['contact-and-more-note', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id}/kontak-dan-catatan-tambahan`).then(
        (res) => res?.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, contact: data }
}

export const UseGetDetailTraining = (id?: string | null) => {
  const { data, isLoading, isFetching } = useQuery<TrainingDetailData>({
    queryKey: ['detail-training', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/training/${id}/detail`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
