import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { DokumenTemplateAim } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetTemplateAimDetail = (props: Props) => {
  const { isGetAll = false } = props
  const [document, setDocument] = useState<DokumenTemplateAim[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const title = searchParams.get('title') || ''
  const id_template_aim = id ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_template_aim })

  const { data, isLoading, isFetching } = useQuery<{
    data: DokumenTemplateAim[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['template-aim-detail-lembaga', ParamsSearch.toString(), id, id_template_aim],
    queryFn: () =>
      AxiosClient.get(`/lembaga/dokumen-template-aim?${ParamsSearch}`).then(
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

export default useGetTemplateAimDetail
