import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  ITemplateSurat,
  ITemplateSuratDetail,
} from '@/pages/modules/E-Office/reference/template-surat/data/types.ts'

interface TemplateSuratProps extends BasicProps {
  status?: string
}

export const UseGetTemplateSurat = (props?: TemplateSuratProps) => {
  const { page, limit, search, status } = props ?? {}

  const [templateSurat, setTemplateSurat] = useState<ITemplateSurat[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (status) Params.append('status', status ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['template-surat', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/template-surat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateSurat(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, templateSurat, meta }
}

export const UseGetDetailTemplateSurat = (id: string) => {
  const [templateSurat, setTemplateSurat] = useState<ITemplateSuratDetail>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['template-surat-detail', id],
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/eoffice/template-surat/${id}/detail`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateSurat(data.data)
    }
  }, [data])

  return { templateSurat, loading }
}
