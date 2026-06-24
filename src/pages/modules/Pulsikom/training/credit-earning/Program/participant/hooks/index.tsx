import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import type { IMessageEmailHistory, IParticipant } from '../data/index'

interface Props extends BasicProps {
  status: 'PENDING' | 'DIKONFIRMASI' | 'DITOLAK' | 'DIBATALKAN'
  id_training: string
}

export const UseGetProgramParticipant = (props: Props) => {
  const { status, page, limit, search, id_training } = props

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status ?? 'PENDING')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IParticipant[]>>({
    queryKey: ['list-program-participant', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id_training}/peserta?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { participant: data?.data ?? [], meta: data?.meta, loading }
}

interface detailProps {
  id_training: string
  id_participant: string
}

export const UseGetDetailParticipantProgram = (props: detailProps) => {
  const { id_training, id_participant } = props

  const { data, isLoading, isFetching } = useQuery<IParticipant>({
    queryKey: ['detail-participant-program', id_participant, id_training],
    enabled: !!id_participant && !!id_training,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/program/${id_training}/peserta/${id_participant}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetHistoryEmail = (props: detailProps) => {
  const { id_training, id_participant } = props

  const { data, isLoading, isFetching } = useQuery<IMessageEmailHistory[]>({
    queryKey: ['email-participant-program', id_participant, id_training],
    enabled: !!id_participant && !!id_training,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/pusilkom/program/${id_training}/peserta/${id_participant}/email-riwayat`
      ).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { historyEmail: data ?? [], loading }
}
