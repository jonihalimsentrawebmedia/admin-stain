import { useEffect, useState } from 'react'
import type { ManagementUnitList } from '../model/management-unit'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'
import type { BasicProps } from '@/utils/globalType.ts'

const useGetManagementUnit = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [managementUnit, setManagementUnit] = useState<ManagementUnitList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-management-unit', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/unit-pengelola?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setManagementUnit(data?.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { managementUnit, loading, meta }
}

export default useGetManagementUnit
