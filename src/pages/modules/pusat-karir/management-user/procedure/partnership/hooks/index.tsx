import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProcedureText } from './types.tsx'

export const UseGetProcedurePartnership = () => {
  const [procedure, setProcedure] = useState<IProcedureText>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['procedure-partnership'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pusat-karir/prosedur-pendaftaran-mitra-kerja').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProcedure(data)
    }
  }, [data])

  return { procedure, loading }
}
