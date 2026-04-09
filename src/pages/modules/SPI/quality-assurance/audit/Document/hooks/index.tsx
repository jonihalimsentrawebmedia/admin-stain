import type { BasicProps } from '@/utils/globalType.ts'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDocumentAudit } from '../data/types'

export const UseGetDocumentList = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}
  const [document, setDocument] = useState<IDocumentAudit[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['document-list', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/daftar-dokumen?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setDocument(data?.data)
    }
  }, [data])

  return { loading, meta, document }
}

export const UseGetDocumentDetail = (id: string) => {
  const [detail, setDetail] = useState<IDocumentAudit>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['document-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/daftar-dokumen/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { loading, detail }
}
