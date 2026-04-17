import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  id_unit_kerja?: string
  id_status?: string
}

export const UseGetEmployee = (props?: props) => {
  const { page, limit, search, id_unit_kerja, id_status } = props ?? {}

  const [employee, setEmployee] = useState<IEmployee[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_unit_kerja) Params.append('id_unit_kerja', id_unit_kerja ?? '')
  if (id_status) Params.append('id_status', id_status ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['employee', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/sdm?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEmployee(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, employee }
}

export const UseGetEmployeeById = (id: string) => {
  const [employee, setEmployee] = useState<IEmployee>()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['employee-by-id', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/sdm/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setEmployee(data)
    }
  }, [data])

  return { employee, loading }
}

export const UseGetReFUnit = () => {
  const [workUnit, setWorkUnit] = useState<
    { id_satuan_organisasi: string; nama_satuan_organisasi: string }[]
  >([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['work-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/ref/unit').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setWorkUnit(data)
    }
  }, [data])

  return { workUnit, loading }
}
