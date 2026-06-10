import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ITypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/data/types.ts'

interface props extends BasicProps {
  id_jenis_surat: string
}

export const UseGetTypeTemplateLatter = (props?: props) => {
  const { id_jenis_surat, page, search, limit } = props ?? {}

  const [typeTemplate, setTypeTemplate] = useState<ITypeTemplateLetter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_jenis_surat) params.append('id_jenis_surat', id_jenis_surat)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-template', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-jenis-template-surat?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeTemplate(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { typeTemplate, meta, loading }
}

export const UseGetDetailTypeTemplateLatter = (id_template: string) => {
  const [typeTemplate, setTypeTemplate] = useState<ITypeTemplateLetter>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-template-detail', id_template],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-jenis-template-surat/${id_template}`).then(
        (res) => res.data.data
      ),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeTemplate(data)
    }
  }, [data])

  return { typeTemplate, loading }
}
