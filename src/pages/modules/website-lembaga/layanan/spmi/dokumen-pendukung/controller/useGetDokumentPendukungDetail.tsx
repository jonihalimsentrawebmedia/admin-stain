import type { Meta } from '@/components/common/table/TablePagination'
import type { DocumentSupportAccreditationList } from '../model'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

interface Props {
  isGetAll?: boolean
}
const useGetDokumentPendukungDetail = (props: Props) => {
  const { isGetAll = false } = props
  const [document, setDocument] = useState<DocumentSupportAccreditationList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const title = searchParams.get('title') || ''
  const id_daftar_dokumen = id ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_daftar_dokumen })

  const { data, isLoading, isFetching } = useQuery<{
    data: DocumentSupportAccreditationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['daftar-dokumen-akreditasi-lembaga', ParamsSearch.toString(), id, id_daftar_dokumen],
    queryFn: () =>
      AxiosClient.get(`/lembaga/dokumen-pendukung-akreditasi?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDocument(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    document,
    loading,
    meta,
    title,
  }
}

export default useGetDokumentPendukungDetail
