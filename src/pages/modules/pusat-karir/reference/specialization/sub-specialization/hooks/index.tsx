import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { ISubSpecialization } from '../data/types'

interface Props extends BasicProps {
  id?: string
}

export const UseGetSubSpecialization = (props?: Props) => {
  const { page, search, limit, id } = props ?? {}

  const [subSpecialization, setSubSpecialization] = useState<ISubSpecialization[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (id) ParamsSearch.append('id-spesialisasi', id ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['sub-specialization', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusat-karir/sub-spesialisasi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSubSpecialization(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { subSpecialization, meta, loading }
}
