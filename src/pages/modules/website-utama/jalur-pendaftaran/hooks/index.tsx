import { useEffect, useState } from 'react'
import type { IRegistrationPath } from '../data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetRegisterPath = () => {
  const [registerPath, setRegisterPath] = useState<IRegistrationPath[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-path'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/jalur-pendaftaran').then((res) => res.data),
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
