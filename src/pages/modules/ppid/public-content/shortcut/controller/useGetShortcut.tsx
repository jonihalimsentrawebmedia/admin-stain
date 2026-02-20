import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { IShortcut } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetShortcut = (props: Props) => {
  const { isGetAll = false } = props
  const [shortcuts, setShortcuts] = useState<IShortcut[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: IShortcut[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['shortcut', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/unit-ppid/pintasan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setShortcuts(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    shortcuts,
    loading,
    meta,
  }
}

export default useGetShortcut
