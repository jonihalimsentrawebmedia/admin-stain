import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { ICompanySize } from '../data/types.ts'

export const UseGetCompanySize = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const [companySize, setCompanySize] = useState<ICompanySize[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['company-size', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusat-karir/ukuran-perusahaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCompanySize(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { companySize, meta, loading }
}

export const USeGetDetailCompanySize = (id: string) => {
  const [detail, setDetail] = useState()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-company-size', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pusat-karir/ukuran-perusahaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
