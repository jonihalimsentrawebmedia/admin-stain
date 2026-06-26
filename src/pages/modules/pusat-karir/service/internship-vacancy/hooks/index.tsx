import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListInternshipVacancy = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<{ data: IJobVacancy[]; meta: Meta }>({
    queryKey: ['internship-vacancy', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/lowongan-magang-pekerjaan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { internshipVacancy: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetDetailInternshipVacancy = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IJobVacancy>({
    queryKey: ['internship-vacancy-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/lowongan-magang-pekerjaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { internshipVacancy: data, loading }
}
