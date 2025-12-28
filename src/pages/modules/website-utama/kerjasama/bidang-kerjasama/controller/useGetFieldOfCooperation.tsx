import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FieldOfCooperationList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetFieldOfCooperation = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams

  ParamsSearch = new URLSearchParams({ page, limit, search })

  const [fieldOfCooperation, setFieldOfCooperation] = useState<FieldOfCooperationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: FieldOfCooperationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-field-of-cooperation', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/bidang-kerjasama?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFieldOfCooperation(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    fieldOfCooperation,
    loading,
    meta,
  }
}

export default useGetFieldOfCooperation
