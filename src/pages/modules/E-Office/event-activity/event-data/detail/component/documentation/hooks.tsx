import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props extends BasicProps {
  id_acara: string
}

export interface IDocumentationEvent {
  id_acara_dokumentasi: string
  id_acara: string
  id_satuan_organisasi: string
  keterangan: string
  jenis_file: 'UPLOAD' | 'URL'
  url_file: string
  key_file: string | null
  dokumen: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetDocumentation = (props: props) => {
  const { search, limit, page, id_acara } = props

  const [file, setFile] = useState<IDocumentationEvent[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['documentation', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/acara/${id_acara}/dokumentasi`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFile(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, file }
}
