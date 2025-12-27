import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import type { RegencyList } from '../model'

interface Props {
  isGetAll: boolean
 
}

const useGetRegency = (props?: Props) => {
  const { isGetAll = false,  } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
   
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [regency, setRegency] = useState<RegencyList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: RegencyList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-regency', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/kabupaten?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegency(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
   regency,
    loading,
    meta,
  }
}

export default useGetRegency
