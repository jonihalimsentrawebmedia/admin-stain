// pusat-karir/pelamar-pekerjaan/:id_lowongan

import type { StatusApplicant } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface Props extends BasicProps {
  id_lowongan: string
  status?: StatusApplicant
}

export const UseGetApplicant = (props?: Props) => {
  const { id_lowongan, status, search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('status_lowongan', status ?? 'MASUK')
  ParamsSearch.append('search', search ?? '')
  ParamsSearch.append('page', page ?? '1')
  ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: []; meta: Meta }>({
    queryKey: ['applicant-user', id_lowongan, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/pelamar-pekerjaan/${id_lowongan}?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { applicant: data?.data ?? [], loading, meta: data?.meta }
}
