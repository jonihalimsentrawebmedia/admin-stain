import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface props {
  id_mail_surat_tugas: string
  page?: string
  limit?: string
  search?: string
}

export interface IDokumentasi {
  id_dokumentasi: string
  id_mail_surat_tugas: string
  url_file: string
  key_file: string | null
  keterangan: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetDocumentation = (props: props) => {
  const { search, limit, page, id_mail_surat_tugas } = props

  const [file, setFile] = useState<IDokumentasi[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['documentation-tugas', Params.toString(), id_mail_surat_tugas],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id_mail_surat_tugas}/dokumentasi?${Params}`).then(
        (res) => res.data
      ),
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
