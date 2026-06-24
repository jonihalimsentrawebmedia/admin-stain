import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDocumentAudit } from '../data/types'

export const UseGetDocumentList = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IDocumentAudit[]>>({
    queryKey: ['document-list', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/daftar-dokumen?${Params}`).then((res) => res.data),
  })

  const document: IDocumentAudit[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, document }
}

export const UseGetDocumentDetail = (id: string) => {
  const { data: detail, isLoading, isFetching } = useQuery<IDocumentAudit>({
    queryKey: ['document-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/daftar-dokumen/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { loading, detail }
}
