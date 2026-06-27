import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IRegistrationResponse {
  data: IRegistrationPath[]
  meta: Meta
}

export const UseGetRegistrationProdi = () => {
  const { data, isLoading, isFetching } = useQuery<IRegistrationResponse>({
    queryKey: ['registration-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/jalur-pendaftaran').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { registrationProdi: data?.data ?? [], loading, meta: data?.meta }
}
