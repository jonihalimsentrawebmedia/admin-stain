import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IReminderAgenda } from '../data/types'

export const UseGetReminderAgenda = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IReminderAgenda[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['reminder-agenda', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/waktu-pengingat-agenda?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, reminderAgenda: data?.data ?? [], meta: data?.meta }
}
