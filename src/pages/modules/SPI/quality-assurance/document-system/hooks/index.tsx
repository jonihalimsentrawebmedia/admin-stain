import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISystemDocument } from '@/pages/modules/SPI/quality-assurance/document-system/data/types.ts'

export const UseGetDocumentSystem = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}
  const [document, setDocument] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['document-system', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/sistem-dokumen?${Params}`).then((res) => res.data),
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

export const UseGetDocumentSystemDetail = (id: string) => {
  const [detail, setDetail] = useState<ISystemDocument>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['document-system-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/spi/sistem-dokumen/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { loading, detail }
}
