import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobSeekerRegistered } from '../data/types'

export type Status = 'PENDING' | 'REVISI' | 'DITOLAK' | 'DISETUJUI'

interface Props extends BasicProps {
  status: Status
}

export const UseGetVerificationJobSeeker = (props?: Props) => {
  const { status, page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (status) ParamsSearch.append('status_pendaftaran', status)

  const { data, isLoading, isFetching } = useQuery<{ data: IJobSeekerRegistered[]; meta: Meta }>({
    queryKey: ['verification-job-seeker', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-pencari-kerja?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, meta: data?.meta, verification: data?.data ?? [] }
}

export const UseGetDetailVerificationJobSeeker = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IJobSeekerRegistered>({
    queryKey: ['detail-verification-job-seeker', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-pencari-kerja/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
