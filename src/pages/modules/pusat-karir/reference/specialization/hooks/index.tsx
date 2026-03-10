import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { ISpecialization } from '../data/types'

export const UseGetSpecialization = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const [specialization, setSpecialization] = useState<ISpecialization[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['specialization', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusat-karir/spesialisasi?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSpecialization(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { specialization, meta, loading }
}

export const USeGetDetailSpecialization = (id: string) => {
  const [detail, setDetail] = useState<ISpecialization>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-specialization', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/pusat-karir/spesialisasi/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
