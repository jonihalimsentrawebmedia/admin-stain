import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'

export const UseGetTypeLetters = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: IMailTypeLetter[]; meta: Meta }>({
    queryKey: ['code-letter-type', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/mail-jenis-surat?' + params).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { loading, letterType: queryData?.data ?? [], meta: queryData?.meta }
}

export const UseGetDetailTypeLetter = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IMailTypeLetter>({
    queryKey: ['code-letter-type-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/mail-jenis-surat/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  return { letter: data, loading }
}
