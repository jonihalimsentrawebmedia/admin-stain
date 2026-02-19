import { useEffect, useState } from 'react'
import type { DocumentItem } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll?: boolean
}
const useGetInformationRegularDocument = (props: Props) => {
  const { isGetAll = false } = props
  const [document, setDocument] = useState<DocumentItem[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const idCategory = id || ''
  const search = searchParams.get('search') || ''
  const title = searchParams.get('title') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  if (idCategory) {
    ParamsSearch.append('id-kategori', idCategory)
  }
  const { data, isLoading, isFetching } = useQuery<{
    data: DocumentItem[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['information-regular-ppip-document', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/informasi-berkala-dokumen?${ParamsSearch}`).then(
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
    idCategory,
  }
}

export default useGetInformationRegularDocument
