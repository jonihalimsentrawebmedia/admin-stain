import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailJobSeeker, IShortJobSeeker } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetJobsSeekers = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IShortJobSeeker[]; meta: Meta }>({
    queryKey: ['jobs-seekers', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/pencari-kerja?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { jobSeekers: data?.data ?? [], meta: data?.meta, loading }
}

export const UseGetDetailJobsSeekers = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDetailJobSeeker>({
    queryKey: ['detail-jobs-seekers', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/pencari-kerja/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
