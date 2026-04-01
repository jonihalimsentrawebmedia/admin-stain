import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/data'

interface Props extends BasicProps {
  status: 'PENDING' | 'DIKONFIRMASI' | 'DITOLAK' | 'DIBATALKAN'
  id_training: string
}

export const UseGetTrainingParticipant = (props: Props) => {
  const { status, page, limit, search, id_training } = props

  const [participant, setParticipant] = useState<IParticipant[]>([])
  const [meta, setMeta] = useState<Meta>()

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

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setParticipant(data?.data)
    }
  }, [data])

  return { participant, meta, loading }
}
