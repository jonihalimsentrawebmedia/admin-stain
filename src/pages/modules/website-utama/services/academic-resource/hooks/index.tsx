import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAcademicResource } from '../data/resolver.tsx'

export const UseGetAcademicResource = (props: BasicProps) => {
  const { search, limit, page } = props

  const [academicResource, setAcademicResource] = useState<IAcademicResource[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '')
  if (page) Params.append('page', page ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['academic-resource', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/academic-resources?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicResource(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { academicResource, loading, meta }
}

export const UseGetAcademicResourceDetail = (id?: string) => {
  const [academicResource, setAcademicResource] = useState<IAcademicResource>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['academic-resource-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/academic-resources/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicResource(data)
    }
  }, [data])

  return { academicResource, loading }
}

export const UseGetLogAcademicResource = (id: string) => {
  const [logData, setLogData] = useState<any[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-academic-resource', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/academic-resources-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLogData(data)
    }
  }, [data])

  return { logData, loading }
}
