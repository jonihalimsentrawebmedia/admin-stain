import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISuratGenerated, ISuratGeneratedDetail } from '../data/types'

export const UseGetSuratGenerated = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [suratList, setSuratList] = useState<ISuratGenerated[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['surat-generated', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-generated?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSuratList(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, suratList, meta }
}

export const UseGetDetailSuratGenerated = (id: string) => {
  const [detail, setDetail] = useState<ISuratGeneratedDetail>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['surat-generated-detail', id],
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-generated/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data.data)
    }
  }, [data])

  return { detail, loading }
}
