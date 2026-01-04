import { useEffect, useState } from 'react'
import type { ManagementUnitList } from '../model/management-unit'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'

const useGetManagementUnit = () => {
  const [managementUnit, setManagementUnit] = useState<ManagementUnitList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-management-unit'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/unit-pengelola`).then(
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
