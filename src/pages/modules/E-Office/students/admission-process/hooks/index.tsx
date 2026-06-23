import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAdmissionProcess } from '../data/types.ts'

export const UseGetAdmissionProcess = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{
    data: IAdmissionProcess[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-process', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/mahasiswa/jalur-masuk?${Params}`).then(
        (res) => res.data,
      ),
  })

  const loading = isLoading || isFetching

  return {
    loading,
    admissionProcess: queryData?.data ?? [],
    meta: queryData?.meta,
  }
}
