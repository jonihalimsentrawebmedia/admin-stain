import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IMessageEmailHistory } from '@/pages/modules/Pulsikom/training/list-training/participant/data'

interface Props extends BasicProps {
  status: 'PENDING' | 'DIKONFIRMASI' | 'DITOLAK' | 'DIBATALKAN'
  id_training: string
}

export const UseGetTrainingParticipant = (props: Props) => {
  const { status, page, limit, search, id_training } = props

  const ParamsSearch = new URLSearchParams()
  if (status) ParamsSearch.append('status', status ?? 'PENDING')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-training-participant', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id_training}/peserta?${ParamsSearch}`).then(
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

export const UseGetDetailParticipant = (props: detailProps) => {
  const { id_training, id_participant } = props

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-participant', id_participant, id_training],
    enabled: !!id_participant && !!id_training,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusilkom/training/${id_training}/peserta/${id_participant}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}

export const UseGetHistoryEmail = (props: detailProps) => {
  const { id_training, id_participant } = props

  const { data, isLoading, isFetching } = useQuery<IMessageEmailHistory[]>({
    queryKey: ['email-participant', id_participant, id_training],
    enabled: !!id_participant && !!id_training,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/pusilkom/training/${id_training}/peserta/${id_participant}/email-riwayat`
      ).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { historyEmail: data ?? [], loading }
}
