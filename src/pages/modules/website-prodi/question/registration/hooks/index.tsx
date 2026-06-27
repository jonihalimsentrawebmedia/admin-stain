import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface IRegistrationResponse {
  data: IRegistrationPath[]
  meta: Meta
}

export const UseGetRegistrationProdi = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<IRegistrationResponse>({
    queryKey: ['registration-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/prodi/jalur-pendaftaran?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { registrationProdi: data?.data ?? [], loading, meta: data?.meta }
}
