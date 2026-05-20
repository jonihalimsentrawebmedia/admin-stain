import { useEffect, useState } from 'react'
import type { IRegistrationPath } from '../data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetRegisterPath = (props: BasicProps) => {
  const { page, limit, search } = props

  const [registerPath, setRegisterPath] = useState<IRegistrationPath[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-path', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegisterPath(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { registerPath, loading, meta }
}

export const UseGetRegisterPathById = (id: string) => {
  const [registerPath, setRegisterPath] = useState<IRegistrationPath>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-path-id', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegisterPath(data)
    }
  }, [data])

  return { registerPath, loading }
}
