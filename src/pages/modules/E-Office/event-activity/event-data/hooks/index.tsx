import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDetailEventPrint,
  IEvent,
} from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'

export const UseGetEventActivity = (props: BasicProps) => {
  const { search, limit, page } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IEvent[]; meta: Meta }>({
    queryKey: ['event-activity', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/acara?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, event: data?.data ?? [] }
}

export const UseGetDetailEventActivity = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IEvent>({
    queryKey: ['event-activity-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/eoffice/acara/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { event: data, loading }
}

export const UseGetListAttendance = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IDetailEventPrint }>({
    queryKey: ['attendance-event', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/eoffice/acara/${id}/daftar-tamu`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { attendance: data?.data, loading }
}
