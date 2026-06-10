import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface props extends BasicProps {
  id_jenis_template_surat: string
}

export const UseGetTypeTemplateLetter = (props: props) => {
  const { page, search, limit, id_jenis_template_surat } = props

  const [templateLetter, setTemplateLetter] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_jenis_template_surat) params.append('id_jenis_template_surat', id_jenis_template_surat)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-template-letter', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-template-surat?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateLetter(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { templateLetter, meta, loading }
}
