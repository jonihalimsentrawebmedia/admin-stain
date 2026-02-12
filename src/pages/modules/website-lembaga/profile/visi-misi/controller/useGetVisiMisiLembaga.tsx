import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { VisiMisiLembagaList } from '../model'
interface Props {
  isGetAll?: boolean
}
const useGetVisiMisiLembaga = (props: Props) => {
  const { isGetAll=false } = props
  const [visiMisi, setVisiMisi] = useState<VisiMisiLembagaList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: VisiMisiLembagaList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['visi-misi-lembaga', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/lembaga/visi-misi?${isGetAll ? '' : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVisiMisi(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    visiMisi,
    loading,
    meta,
  }
}

export default useGetVisiMisiLembaga
