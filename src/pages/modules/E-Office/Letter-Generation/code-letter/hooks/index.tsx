// eoffice/nomor-surat-otomatis

import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INUmberLetterAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/types.ts'

export const UseGetLetterNumberAutomatic = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: INUmberLetterAutomatic[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['letter-number-automatic', Params.toString()],
    queryFn: () => AxiosClient(`/eoffice/nomor-surat-otomatis?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { letterNumber: queryData?.data ?? [], meta: queryData?.meta, loading }
}

export const UseGetDetailLetterNumberAutomatic = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<INUmberLetterAutomatic>({
    queryKey: ['letter-number-automatic-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/eoffice/nomor-surat-otomatis/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  return { letterNumber: data, loading }
}
