import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/data/types.ts'
import type { IDispositionInbox } from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetCopyLetter = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: ICopyLetter[]; meta: Meta }>({
    queryKey: ['copy-letter', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/tembusan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, copyLetter: data?.data ?? [], meta: data?.meta }
}

export const UseGetCopyLetterDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IDispositionInbox>({
    queryKey: ['copy-letter-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/tembusan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, copyLetterDetail: data }
}
