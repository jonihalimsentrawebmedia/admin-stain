import type { Meta } from "@/components/common/table/TablePagination"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"
import type { ThemaLembaga } from "../model"

interface Props {
  isGetAll?: boolean
}
const useGetTemplateInstitutation = (props: Props) => {

 const { isGetAll=false } = props
  const [template, setTemplate] = useState<ThemaLembaga[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page =isGetAll?"0": searchParams.get('page') || '1'
  const limit =isGetAll?"0": searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: ThemaLembaga[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['template-pengaturan', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/lembaga/thema?${isGetAll ? '' : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplate(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    template,
    loading,
    meta,
  }
}

export default useGetTemplateInstitutation