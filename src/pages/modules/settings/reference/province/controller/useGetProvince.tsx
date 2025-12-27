import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProvinceList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
  isGetAll: boolean
  id_negara?: string
}

const useGetProvince = (props?: Props) => {
  const { isGetAll = false, id_negara } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
    ParamsSearch.append('id_negara', id_negara ?? '')
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [province, setProvince] = useState<ProvinceList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: ProvinceList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-province', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/provinsi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProvince(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    province,
    loading,
    meta,
  }
}

export default useGetProvince
