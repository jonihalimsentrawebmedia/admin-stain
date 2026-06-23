import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGuestBook } from '@/pages/modules/E-Office/gustbook/data/types.ts'

export const UseGetGuestBooks = (props: BasicProps) => {
  const { search, limit, page } = props

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: IGuestBook[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['guest-book', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/buku-tamu?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { guestBook: queryData?.data ?? [], meta: queryData?.meta, loading }
}

export const UseGetDetailGuestBooks = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGuestBook>({
    queryKey: ['guest-book-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/buku-tamu/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  return { guestBook: data, loading }
}
