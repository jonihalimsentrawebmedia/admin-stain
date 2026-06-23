import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISuratGenerated, ISuratGeneratedDetail } from '../data/types'

export const UseGetSuratGenerated = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{
    data: ISuratGenerated[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['surat-generated', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-generated?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, suratList: queryData?.data ?? [], meta: queryData?.meta }
}

export const UseGetDetailSuratGenerated = (id: string) => {
  const { data: queryData, isLoading, isFetching } = useQuery<{
    data: ISuratGeneratedDetail
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['surat-generated-detail', id],
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-generated/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { detail: queryData?.data, loading }
}
