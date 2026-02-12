import type { Meta } from '@/components/common/table/TablePagination'
import type { DocumentSupportList } from '../model'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

interface Props {
  isGetAll?: boolean
}
const useGetTemplateAim = (props: Props) => {
  const { isGetAll = false } = props
  const [document, setDocument] = useState<DocumentSupportList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: DocumentSupportList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['template-aim-lembaga', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/lembaga/template-aim?${ParamsSearch}`).then(
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
  }
}

export default useGetTemplateAim
