import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGuestBook } from '@/pages/modules/E-Office/gustbook/data/types.ts'

export const UseGetGuestBooks = (props: BasicProps) => {
  const { search, limit, page } = props
  const [guestBook, setGuestBook] = useState<IGuestBook[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['guest-book'],
    queryFn: () => AxiosClient.get('/eoffice/buku-tamu').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGuestBook(data?.data ?? [])
      setMeta(data?.meta ?? [])
    }
  }, [data])

  return { meta, loading, guestBook }
}

export const UseGetDetailGuestBooks = (id: string) => {
  const [guestBook, setGuestBook] = useState<IGuestBook>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['guest-book-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/buku-tamu/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGuestBook(data ?? [])
    }
  }, [data])

  return { guestBook, loading }
}
